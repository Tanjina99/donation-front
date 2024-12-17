import axios from "axios";
import React, { useState, useEffect } from "react";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/transactions/combined"
        );
        setTransactions(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 py-6 text-center">
        All Transactions
      </h1>
      <table className="table-auto w-full rounded shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-1xl font-medium whitespace-nowrap">
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Donor Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="border-b hover:bg-gray-200">
              <td className="px-4 py-2">
                {transaction.donationId
                  ? "Donation"
                  : transaction.fundRaisingId
                  ? "Fundraising"
                  : "Unknown"}
              </td>
              <td className="px-4 py-2">
                {transaction.donationId ? (
                  <span>{transaction.donationId.title}</span>
                ) : transaction.fundRaisingId ? (
                  <span>{transaction.fundRaisingId.title}</span>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2">
                {transaction.category
                  ? transaction.category
                  : transaction.donationId?.category
                  ? transaction.donationId.category
                  : transaction.fundRaisingId?.category
                  ? transaction.fundRaisingId.category
                  : "No Category"}
              </td>
              <td className="px-4 py-2">
                {transaction.donorId?.fullName || "Anonymous"}
              </td>
              <td className="px-4 py-2">
                {transaction.donorId?.email || "No Email"}
              </td>
              <td className="px-4 py-2">
                {transaction.donorId?.imageUrl ? (
                  <img
                    src={transaction.donorId?.imageUrl}
                    alt="Donor Image"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500">No image</div>
                )}
              </td>
              <td className="px-4 py-2">{transaction.amount}</td>
              <td className="px-4 py-2">
                {transaction.message || "No message"}
              </td>
              <td className="px-4 py-2">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactions;
