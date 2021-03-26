import { USPS_PATH, ZIP_ORIGIN } from '../utils/constants'
import XmlToJs from 'xml2js'
import { forEach } from 'lodash'
import { toast } from 'react-toastify'

export const validateAddressApi = async (address) =>{
    const query = `<AddressValidateRequest USERID="383VARES6365">
        <Revision>1</Revision>
        <Address ID="0">
            <FirmName>${address.name}</FirmName>
            <Address1></Address1>
            <Address2>${address.address}</Address2>
            <City/>
            </State>
            <Zip5>${address.zipcode}</Zip5>
            <Zip4/>
        </Address>
        </AddressValidateRequest>`

    return query
}

const getPackages = (totalPackageSize, zipcode, shippingType, weight) =>{
    let remainingSize = totalPackageSize
    let query = ''
    let counter = 0
    let finalPackages = []

    while(remainingSize > 0){
        finalPackages.push({
            id: counter,
            container: selectContainer(remainingSize).container,
        })
        counter += 1
        remainingSize -= selectContainer(remainingSize).minus
    }

    let weightPerPackage = weight / finalPackages.length

    forEach(finalPackages, finalPackage =>{
        if(shippingType === 'Priority'){
            query += `<Package ID='${finalPackage.id}'>
                    <Service>${shippingType}</Service>
                    <ZipOrigination>${ZIP_ORIGIN}</ZipOrigination>
                    <ZipDestination>${zipcode}</ZipDestination>
                    <Pounds>0</Pounds>
                    <Ounces>${weightPerPackage}</Ounces>
                    <Container>${finalPackage.container}</Container>
                </Package>\n`
            
        }
    })

    return query
}

const selectContainer = totalPackageSize =>{
    if(isNaN(totalPackageSize)) return null

    if(totalPackageSize < 76){
        return {
            container:'SM FLAT RATE BOX',
            minus: 76
        }
    }
    else if(totalPackageSize < 592){
        return {
            container:'MD FLAT RATE BOX',
            minus: 592
        }
    }
    else{
        return {
            container: 'LG FLAT RATE BOX',
            minus: 900
        }
    }

}

export const calculateNationalShippingCost =  async (address, shippingType, totalPackageSize, weight) =>{

    if(address.country === 'United States' && shippingType === 'First Class'){
        return 0
    }

    const query =`
        <RateV4Request USERID='383VARES6365'>
        <Revision>2</Revision>
            ${getPackages(totalPackageSize, address.zipcode,shippingType, weight)}
        </RateV4Request>
    `

    const xml = query.replace(/[\n\r\t]/g,'')
    const url = `${USPS_PATH}API=RateV4&XML=${xml}`
    
    try{
        const response = await fetch(url)
        const xmlString = await response.text()
        const result = await XmlToJs.parseStringPromise(xmlString)

        if(!result.RateV4Response || result.RateV4Response.Package[0].Error){
            toast.error( result.RateV4Response.Package[0].Error[0].Description[0])
            throw 'There was an error calculating your shipping cost'
        } 
        let shippingCost = 0
        forEach(result.RateV4Response.Package, USPSPackage =>{
            shippingCost += parseFloat(USPSPackage.Postage[0].Rate[0])
        })

        return shippingCost
    } catch(error){
        console.log(error)
        return null
    }
}

export const calculateInternationalShippingCost =  async (address, shippingType, totalSize, weight, subTotal) =>{

    const query =`
        <IntlRateV2Request USERID='383VARES6365'>
            <Revision>2</Revision>
            <Package ID='1'>
                <Pounds>0</Pounds>
                <Ounces>${weight}</Ounces>
                <MailType>Package</MailType>
                <ValueOfContents>${subTotal}</ValueOfContents> 
                <Country>${address.country}</Country>
                <Container>Variable</Container>
                <OriginZip>${ZIP_ORIGIN}</OriginZip>
            </Package>
        </IntlRateV2Request>
    `
    const xml = query.replace(/[\n\r\t]/g,'')
    const url = `${USPS_PATH}API=IntlRateV2&XML=${xml}`
    
    try{
        const response = await fetch(url)
        const xmlString = await response.text()
        const result = await XmlToJs.parseStringPromise(xmlString)

        if(!result.IntlRateV2Response || result.IntlRateV2Response.Package[0].Error){
            toast.error(result.IntlRateV2Response.Package[0].Error[0].Description[0])
            throw 'There was an error calculating your shipping cost'
        }
        const services = result.IntlRateV2Response.Package[0].Service
        let shippingCost = null
        
        forEach(services, service =>{
            if(shippingType === 'First Class'){
                if(service?.SvcDescription[0].includes('First-Class')){
                    if(!shippingCost){
                        shippingCost = service.Postage[0]
                    }else if(service.Postage < shippingCost){
                        shippingCost = service.Postage[0]
                    }
                }
            }else{
                if(service?.SvcDescription[0].includes('Priority')){
                    if(!shippingCost){
                        shippingCost = service.Postage[0]
                    }
                    else if(service.Postage < shippingCost){
                        shippingCost = service.Postage[0]
                    }
                }
            }
        })

        return parseFloat(shippingCost)
    } catch(error){
        console.log(error)
        return null
    }
}