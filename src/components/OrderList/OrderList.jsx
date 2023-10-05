import OrderListItem from '../OrderListItem/OrderListItem';

export default function OrderList({ orders, activeOrder, handleSelectOrder }) {
  const orderItems = orders.map(order =>
    <OrderListItem
      order={order}
      isSelected={order === activeOrder}
      handleSelectOrder={handleSelectOrder}
      key={order._id}
    />
  );

  return (
    <main className="OrderList">
      {orderItems.length ?
      orderItems :
      <span className="noOrders">No Previous Orders!</span>  
    }
    </main>
  )
}