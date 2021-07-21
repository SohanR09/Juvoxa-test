import { List, ListItem } from '@material-ui/core'
import React from 'react'

export const Home = () => {
    return (
        <div style={{ marginTop: '40px'}}>
           <List>
               <ListItem>1. Click on the navbar buttons to open tables.</ListItem>
               <ListItem>2. Pagination is provided on the bottom of the table.</ListItem>
               <ListItem>3. Material-UI is used for UI development.</ListItem>
           </List>
        </div>

    )
}
