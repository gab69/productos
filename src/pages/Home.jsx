import react from 'react'
import Link from 'next/link'
const Home=()=>{


    return (
    <>
     <div>Desde HOME</div>
    <Link href="/Blog">Blog</Link><br/>
    <Link href="/Contact">Contact</Link><br/>
   
   
    </>
    )

}
export default Home