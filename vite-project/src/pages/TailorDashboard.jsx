import { useEffect, useState } from "react";
import API from "../services/api";

export default function TailorDashboard() {

  const [orders, setOrders] = useState([]);
  const [online, setOnline] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /*
  LOAD ORDERS FOR THIS TAILOR
  */
  async function loadOrders() {
    try {

      const res = await API.get(`/orders`);

      const tailorOrders = res.data.filter(
        (o) => o.tailor_id === user.id
      );

      setOrders(tailorOrders);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  /*
  ONLINE / OFFLINE STATUS
  */
  async function changeOnline(status) {
    try {

      await API.post("/tailors/status", {
        tailor_id: user.id,
        online: status
      });

      setOnline(status);

      alert(status ? "You are ONLINE" : "You are OFFLINE");

    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  }

  /*
  UPDATE ORDER STATUS
  */
  async function updateStatus(orderId, status) {

    try {

      await API.put(`/orders/${orderId}/status`, {
        status
      });

      loadOrders();

    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }

  }

  return (

    <div className="page">

      <div className="container">

        <h1 className="pageTitle">Tailor Dashboard</h1>

        {/* ONLINE OFFLINE */}

        <div style={{ marginBottom: 20 }}>

          <button
            onClick={() => changeOnline(true)}
            style={{
              padding: "10px 20px",
              marginRight: 10,
              background: "green",
              color: "white",
              border: "none",
              borderRadius: 6
            }}
          >
            Go Online
          </button>

          <button
            onClick={() => changeOnline(false)}
            style={{
              padding: "10px 20px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: 6
            }}
          >
            Go Offline
          </button>

        </div>


        {/* ORDER LIST */}

        {orders.length === 0 && (
          <p>No orders yet</p>
        )}


        {orders.map((order) => (

          <div key={order.id} className="card" style={{ marginBottom: 20 }}>

            <h2>Order #{order.id}</h2>

            <p>
              <b>Service:</b>{" "}
              {order.stitch_type}
            </p>

            <p>
              <b>Address:</b>{" "}
              {order.pickup_address || order.address}
            </p>

            <p>
              <b>Phone:</b>{" "}
              {order.phone}
            </p>

            <p>
              <b>Status:</b>{" "}
              {order.status}
            </p>


            {/* ACTION BUTTONS */}

            <div style={{ marginTop: 10 }}>

              {order.status === "pending" && (
                <button
                  onClick={() =>
                    updateStatus(order.id, "confirmed")
                  }
                  className="order-btn"
                >
                  Accept
                </button>
              )}


              {order.status === "confirmed" && (
                <button
                  onClick={() =>
                    updateStatus(order.id, "stitching")
                  }
                  className="order-btn"
                >
                  Start Stitching
                </button>
              )}


              {order.status === "stitching" && (
                <button
                  onClick={() =>
                    updateStatus(order.id, "ready")
                  }
                  className="order-btn"
                >
                  Mark Ready
                </button>
              )}


              {order.status === "ready" && (
                <button
                  onClick={() =>
                    updateStatus(order.id, "delivered")
                  }
                  className="order-btn"
                >
                  Mark Delivered
                </button>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}