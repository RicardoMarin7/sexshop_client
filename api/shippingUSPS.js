import { USPS_PATH } from '../utils/constants'
import XmlToJs from 'xml2js'

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

    const xml = query.replace(/[\n\r\t]/g,'')
    const url = `${USPS_PATH}API=Verify&XML=${xml}`
    try {
        const response = await fetch(url)
        const xmlString = await response.text()
        const result = await XmlToJs.parseStringPromise(xmlString)
        if(result.Error) throw `Error: ${result.Error.Description[0]}`
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}