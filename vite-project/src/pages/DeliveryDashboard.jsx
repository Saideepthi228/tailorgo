import { useEffect,useState } from "react";
import API from "../services/api";

export default function DeliveryDashboard(){

  const [orders,setOrders] = useState([]);

  async function loadOrders(){

    try{

      const res = await API.get("/orders");

      setOrders(res.data || []);

    }catch(err){
      console.error(err);
    }

  }

  async function updateStatus(id,status){

    try{

      await API.post(`/orders/${id}/status`,{
        status
      });

      loadOrders();

    }catch(err){
      console.error(err);
    }

  }

  useEffect(()=>{
    loadOrders();
  },[]);

  return(

    <div className="page">

      <div className="container">

        <h1 className="pageTitle">
          Delivery Dashboard
        </h1>

        {orders.length === 0 && (
          <p className="muted">
            No delivery tasks
          </p>
        )}

        {orders.map((o)=>{

          const m = typeof o.measurements === "string"
          ? JSON.parse(o.measurements)
          : o.measurements;

          return(

            <div key={o.id} className="card" style={{marginTop:14}}>

              <h3>Order #{o.id}</h3>

              <p className="muted small">
                Pickup Address: {m?.address}
              </p>

              <p className="muted small">
                Phone: {m?.phone}
              </p>

              <p className="muted small">
                Status: {o.status}
              </p>

              <div style={{marginTop:10,display:"flex",gap:8}}>

                <button
                  className="order-btn"
                  onClick={()=>updateStatus(o.id,"picked")}
                >
                  Pick Cloth
                </button>

                <button
                  className="order-btn"
                  onClick={()=>updateStatus(o.id,"delivered")}
                >
                  Delivered
                </button>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}