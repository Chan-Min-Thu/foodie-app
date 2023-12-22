import { useRouter } from "next/router";

const ActiveOrder = ()=>{
    const router = useRouter()
    const orderSeq = router.query.id
    return(
        <h1>{orderSeq}</h1>
    );
}

export default ActiveOrder;