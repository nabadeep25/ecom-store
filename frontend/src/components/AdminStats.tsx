import { useAdminContext } from "../context/adminContext";

function AdminStats() {
  const { stats, isLoading, refetch } = useAdminContext();

  if (isLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <div className="p-4 ">
      <div className="flex  justify-between m-4">
        <h2 className="text-2xl font-semibold mb-4">Purchase Summary</h2>
        {/** For refeshing the data without reload */}
        <button className="btn btn-primary btn-sm" onClick={refetch}>
          Refresh
        </button>
      </div>
      <div className="flex flex-wrap justify-evenly gap-2">
        <div className="card w-72 h-32 bg-white p-4 bg-green-300 lg:w-1/5 shadow-xl">
          <p className="text-2xl font-semibold  text-center">
            Total Purchase Amount:
          </p>
          <p className="text-xl font-semibold text-center">
            {stats.totalPurchaseAmount}
          </p>
        </div>

        <div className="card w-72 h-32 bg-white p-4 bg-yellow-200 lg:w-1/5 shadow-xl ">
          <p className="text-2xl font-semibold text-center ">
            Total Discount Amount:
          </p>
          <p className="text-xl font-semibold text-center ">
            {stats.totalDiscountAmount}
          </p>
        </div>

        <div className="card w-72 h-fit bg-white p-4 lg:w-1/5 shadow-xl bg-blue-300 ">
          <p className="text-2xl font-semibold  text-center">Discount Codes:</p>
          <ul>
            {stats.discountCodes.map((code) => (
              <li key={code.code}>
                <p className="text-center">
                  Code: {code.code} ({code.used ? "Used" : "Unused"})
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="card w-72 h-fit bg-white p-4 lg:w-1/5 shadow-xl bg-rose-300">
          <p className="text-2xl font-semibold text-center">Item Purchased:</p>
          <ul>
            {stats.itemCountList.map((itemCount) => (
              <li key={itemCount.item.id} className="flex items-center mt-1">
                <img
                  src={itemCount.item.image}
                  alt={itemCount.item.name}
                  className="w-16 h-16 object-cover mr-2 rounded"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">
                    {itemCount.item.name}, Sold: {itemCount.count}{" "}
                  </p>
                  <p className="text-gray-500">
                    Price: {itemCount.item.price} , Stock left:{" "}
                    {itemCount.item.stock}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminStats;
