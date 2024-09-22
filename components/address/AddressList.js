import React from "react";
import AddressCard from "./AddressCard";

const AddressList = ({
  addresses,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => {
  if (addresses.length === 0) {
    return (
      <div className="text-center text-gray-500">
        尚未添加任何地址，請新增一個地址。
      </div>
    );
  }

  return (
    <div>
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleSetDefault={handleSetDefault}
        />
      ))}
    </div>
  );
};

export default AddressList;
