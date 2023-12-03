import { Box } from "@mui/material"

interface Props{
    children: string | JSX.Element | JSX.Element[]
}
const Home = ()=>{
    return(
        <Box>
            <h1>Order App components</h1>
        </Box>
    )
}
export default Home;