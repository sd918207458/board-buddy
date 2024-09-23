import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavbarSwitcher";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home() {
  return (
    <>
      <Navbar />

      <Breadcrumbs />

      <Footer />
    </>
  );
}
