"use client";
import { Product } from "@/app/products/page";
import { db, storage } from "@/firebase/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";

export default function ModalProduct({
  open,
  editing,
}: {
  open: () => void;
  editing: Product[];
}) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState<File | null>();
  const [loading, setLoading] = useState(false);

  const [oldImg, setOldImg] = useState("");


  useEffect(() => {
    if (editing.length > 0) {
      setName(editing[0].name);
      setNotes(editing[0].notes);
      setPrice(editing[0].price.toString());
      setQuantity(editing[0].quantity.toString());
      setPhoto(editing[0].photo);
      setOldImg(editing[0].photo || "");
    }

  }, [editing]);

  const no_img =
    "https://firebasestorage.googleapis.com/v0/b/kd-app-55ea7.appspot.com/o/kd-app%2Fno_img.jpg?alt=media&token=e2ba5a63-250c-4fd6-b229-8ca3cfcd87f4";
  const handlerImg = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOldImg(reader.result as string ?? '');
        setPhoto(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!photo) return;
    try {
      const filename = name;
      const storageRef = ref(storage, `images/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);
      await uploadTask;
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const isAllFieldsEmpty = [name, notes, price, quantity].some(
      (field) => !field
    );
    if (isAllFieldsEmpty || !photo) {
      const errorMessage = isAllFieldsEmpty
        ? "Preencha todos os campos"
        : "Selecione uma imagem";
      alert(errorMessage);
      return;
    }

    try {
      setLoading(true);
      const photoUrl = await uploadImage();
      const date = Date.now();

      const product = {
        name,
        notes,
        price: parseFloat(price.replace(",", ".")),
        quantity: parseInt(quantity),
        date,
        photo: photoUrl,
      };

      if (editing.length > 0) {
        const docRef = doc(db, "products", editing[0].id);
        let oldProduct = {...product, photo: oldImg};
        await updateDoc(docRef, oldProduct);
      } else {
        await addDoc(collection(db, "products"), product);
      }

      setLoading(false);
      alert("Cadastrado com sucesso");

      open();

      setName("");
      setNotes("");
      setPrice("");
      setQuantity("");
      setPhoto(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Salvando produto...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3">
        <span className="text-xl font-bold">Cadastrar Produto</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-3">
        <div className="bg-gray-200 relative items-center justify-between rounded-lg w-52 shrink-0">
          <img
            src={oldImg || no_img}
            className="w-full h-full object-cover"
          />

          <button
            className="bg-primary hover:bg-purple-800 rounded-lg p-2 text-white w-full absolute bottom-0"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <LuUpload size={24} />
              Selecionar um arquivo
            </div>
          </button>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handlerImg}
          />
        </div>

        <div className="flex flex-col flex-1 gap-3">
          <div className="flex flex-col">
            <span>Nome do Produto</span>
            <input
              type="text"
              value={name}
              className="border mb-3 rounded-md p-1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative flex flex-col">
            <span>Descrição</span>
            <textarea
              value={notes}
              className="border rounded-md align-text-top p-1 resize-none"
              rows={4}
              maxLength={100}
              onChange={(e) => setNotes(e.target.value)}
            />
            <span className="absolute text-xs self-end bottom-2 right-3">
              {notes.length}/100
            </span>
          </div>

          <div className="flex flex-row gap-3 flex-1">
            <div className="flex w-full flex-col">
              <span>Valor</span>
              <input
                type="number"
                value={price}
                className="border rounded-md p-1 w-full"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col">
              <span>Quantidade</span>
              <input
                type="number"
                value={quantity}
                className="border rounded-md p-1 w-full"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* <div className="flex flex-1 flex-col bg-slate-700">
          <div className="flex flex-col">
            <span>Nome do Produto</span>
            <input
              type="text"
              value={name}
              className="border mb-3 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative flex flex-col">
            <span>Descrição</span>
            <input
              type="text"
              value={notes}
              className="border h-28 rounded-md"
              maxLength={100}
              onChange={(e) => setNotes(e.target.value)}
            />
            <span className="absolute text-xs self-end bottom-2 right-3">
              {notes.length}/100
            </span>
          </div>

          <div className="flex-1 gap-2 sm:flex sm:flex-row">
            <div className="flex flex-col flex-1">
              <span>Valor</span>
              <input
                type="number"
                value={price}
                className="border rounded-md"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <span>Quantidade</span>
              <input
                type="number"
                value={quantity}
                className="border rounded-md"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex flex-row gap-3 justify-end">
        <button
          className="bg-zinc-500 hover:bg-zinc-700 rounded-md p-2 text-white"
          onClick={open}
        >
          Voltar
        </button>
        <button
          className="bg-primary hover:bg-purple-800 rounded-md p-2 text-white"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
