import axios from "axios";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import nohistory from "../../public/nohistroy.json";
import { useParams } from "react-router";

const UserTransaction = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/transactions/combined/${id}`
        );
        setTransactions(response.data.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [id]);

  if (transactions.length === 0) {
    return (
      <div className="h-screen px-4 py-8 flex flex-col items-center justify-center">
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Sorry, you have no transaction history
            <p>Start Donating</p>
          </h1>
        </div>
        <Lottie
          animationData={nohistory}
          loop={true}
          className="w-100 h-100 "
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto h-screen px-4 py-8 flex justify-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 py-6 text-center">
          My Transactions History
        </h1>
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-lg">Type</th>
              <th className="px-6 py-3 text-left text-lg">Title</th>
              <th className="px-6 py-3 text-left text-lg">Description</th>
              <th className="px-6 py-3 text-left text-lg">Amount</th>
              <th className="px-6 py-3 text-left text-lg">Category</th>
              <th className="px-6 py-3 text-left text-lg">Date</th>
              <th className="px-6 py-3 text-left text-lg">Name</th>
              <th className="px-6 py-3 text-left text-lg">Email</th>
              <th className="px-6 py-3 text-left text-lg">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="border-b border-gray-300">
                <td className="px-6 py-3">
                  {transaction.donationId
                    ? "Donation"
                    : transaction.fundRaisingId
                    ? "Fundraising"
                    : "Unknown"}
                </td>
                <td className="px-6 py-3">
                  {transaction.donationId
                    ? transaction.donationId.title
                    : transaction.fundRaisingId
                    ? transaction.fundRaisingId.title
                    : "-"}
                </td>
                <td className="px-6 py-3">
                  {transaction.description ||
                    transaction.donationId?.description ||
                    transaction.fundRaisingId?.description ||
                    "No Description"}
                </td>
                <td className="px-6 py-3">{transaction.amount}</td>
                <td className="px-6 py-3">
                  {transaction.category ||
                    transaction.donationId?.category ||
                    transaction.fundRaisingId?.category ||
                    "No Category"}
                </td>
                <td className="px-6 py-3">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{transaction.donorId.fullName}</td>
                <td className="px-6 py-3">{transaction.donorId.email}</td>
                <td className="px-6 py-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      {transaction.donorId?.imageUrl ? (
                        <img
                          src={transaction.donorId?.imageUrl}
                          alt="Donor Image"
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-500">No image</div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransaction;
