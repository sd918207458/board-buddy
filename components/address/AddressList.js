import React from "react";
import AddressCard from "./AddressCard";

const AddressList = ({
  addresses,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => (
  <div>
    {addresses.length === 0 ? (
      <div className="text-center text-gray-500">
        尚未添加任何地址，請新增一個地址。
      </div>
    ) : (
      addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleSetDefault={handleSetDefault}
        />
      ))
    )}
  </div>
);

export default AddressList;
