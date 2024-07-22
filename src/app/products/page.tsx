"use client";
import { ThemeSwitcher } from "@/components/ToogleButton/ToogleTheme";
import { LuClipboardList, LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import "devextreme/dist/css/dx.light.css";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { DataGrid } from "devextreme-react";
import {
  Column,
  GroupPanel,
  Pager,
  Paging,
  Selection,
} from "devextreme-react/cjs/data-grid";
import ModalProduct from "@/components/ModalProduct/ModalProduct";

export interface Product {
  id: string;
  name: string;
  notes: string;
  price: number;
  quantity: number;
  date: number;
  photo: string | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addProduct, setAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);  

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedProducts: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(updatedProducts);
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleEdit = () => {
    if (selectedProduct.length != 1) {
      alert("Selecione um item para editar");
      return;
    }
    setAddProduct(!addProduct);
  };

  const handleDelete = () => {
    if (selectedProduct.length === 0) {
      alert("Selecione algum item para excluir");
      return;
    }
    const docIds = selectedProduct.map((p) => p.id);
    for (const docId of docIds) {
      const docRef = doc(db, "products", docId);
      deleteDoc(docRef);
    }

  };

  return (
    <div className="flex-1 min-h-screen bg-[#F2F5F3] dark:bg-[#1D1D1D]">
      <div className="sticky top-0 right-0 flex flex-row h-20 bg-primary items-center justify-between px-5">
        <div className="flex flex-row items-center">
          <LuClipboardList
            size={32}
            className="hover:sm:text-primary"
            color="white"
          />
          <span className="text-white font-bold">Produtos</span>
        </div>
        <div className="items-center">
          <ThemeSwitcher />
        </div>
      </div>
      <div className="flex-1 p-5 rounded-lg bg-white dark:bg-[#232323] m-5">
        <div className={addProduct ? "hidden" : ""}>
          <div className="flex flex-row gap-3 mb-3">
            <div onClick={handleEdit}>
              <LuPencil
                size={32}
                className="bg-primary hover:bg-purple-800 rounded-sm p-2 text-white cursor-pointer"
              />
            </div>
            <div onClick={() => {setAddProduct(!addProduct); setSelectedProduct([])}}>
              <LuPlus
                size={32}
                className="bg-primary hover:bg-purple-800 rounded-sm p-2 text-white cursor-pointer"
              />
            </div>
            <div onClick={handleDelete}>
              <LuTrash2
                size={32}
                className="bg-red-700 hover:bg-red-800 rounded-sm p-2 text-white cursor-pointer"
              />
            </div>
          </div>
          <DataGrid
            id="grid"
            dataSource={products}
            showBorders={true}
            columnAutoWidth={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
            onSelectionChanged={(e) => setSelectedProduct(e.selectedRowKeys)}
            selectedRowKeys={selectedProduct}
          >
            <Selection mode="multiple" showCheckBoxesMode="onClick"  />
            <GroupPanel visible={true} />
            <Column
              dataField="photo"
              caption="Imagem"
              cellRender={({ data }) => (
                <img
                  src={data.photo}
                  alt="photo"
                  className="w-14 h-14 rounded-md"
                />
              )}
            />

            <Column dataField="name" caption="Nome" />
            <Column dataField="notes" caption="Notas" />
            <Column
              dataField="price"
              caption="Preço"
              format={{ currency: "BRL", maximumFractionDigits: 2 }}
              dataType="number"
            />
            <Column dataField="quantity" caption="Quantidade" />
            <Column dataField="date" caption="Data" dataType="date" />
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              allowedPageSizes={[10, 20, 30]}
              displayMode={"full"}
              showPageSizeSelector={true}
              showInfo={true}
              showNavigationButtons={true}
            />
          </DataGrid>
        </div>

        {addProduct ? <ModalProduct open={() => setAddProduct(!addProduct)} editing={selectedProduct} /> : null}
      </div>
    </div>
  );
}
