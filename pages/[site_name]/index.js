import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

function Asd() {
  const router = useRouter();
  
  console.log(router.query)

  return (
    <div style={{ textAlign: 'center' }}>
      Corporate page name: {router.query.site_name}
    </div>
  )
}

export default Asd;