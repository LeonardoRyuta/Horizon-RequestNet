const Checkout = ({ cart }: any) => {
  console.log(cart);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item: any, index: number) => (
            <div key={index} className="border p-4 mb-2 rounded shadow flex flex-row gap-4">
              <img src={item.image} alt={item.name} className="w-32 object-contain mb-4" />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
            </div>
          ))}
          <p className="text-xl font-bold mt-4">
            Total: ${cart.reduce((total: any, item: any) => total + item.price, 0).toFixed(2)}
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4">
            Confirm Purchase
          </button>
        </div>
      )}
    </div>
  )
};

export default Checkout;
