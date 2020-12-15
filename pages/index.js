import Head from 'next/head'
import { Button } from 'semantic-ui-react'

import BasicLayout from '../layouts/BasicLayout'

export default function Home() {
  return (
    <BasicLayout> 
      <p> We are on sex shop construction</p>
      <Button>
        Soy un boton
      </Button>
    </BasicLayout>
  )
}
