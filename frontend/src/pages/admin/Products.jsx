import ProductList from "../../features/products/ProductList";

export default function ProductsPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
       
      </div>
      <ProductList />
    </div>
  );
}
