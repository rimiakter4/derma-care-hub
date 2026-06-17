"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { 
  PlusCircle, 
  Loader2, 
  Package, 
  DollarSign, 
  AlignLeft, 
  UploadCloud, 
  X 
} from "lucide-react";

export default function AddItemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // ইমেজ প্রিভিউ এবং ডাটাবেজে পাঠানোর জন্য স্টেট
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  // অথেন্টিকেশন চেক
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ইমেজ ফাইল হ্যান্ডলার
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ৫ এমবির বেশি ফাইল হলে এরর দেখাবে
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large! Max 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // ব্রাউজারে দেখানোর জন্য
        setBase64Image(reader.result);  // ডাটাবেজে সেভ করার জন্য
      };
      reader.readAsDataURL(file); 
    }
  };

  // ইমেজ রিমুভ করার ফাংশন
  const removeImage = () => {
    setImagePreview(null);
    setBase64Image("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ইমেজ আপলোড না করলে সতর্ক করবে
    if (!base64Image) {
      toast.warn("Please upload a product image.");
      return;
    }

    setLoading(true);

    const formData = {
      name: e.target.itemName.value,
      price: parseFloat(e.target.price.value),
      description: e.target.description.value,
      category: e.target.category.value,
      image: base64Image, // সঠিক ইমেজ ডাটা পাঠানো হচ্ছে
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Product successfully added!");
        e.target.reset();
        removeImage();
        
        // সাকসেস হলে অল প্রোডাক্ট পেজে পাঠিয়ে দিবে
        router.push("/Allproducts");
        router.refresh(); 
      } else {
        toast.error(result.error || "Failed to add product.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return (
    <div className="min-h-screen flex justify-center items-center bg-background text-primary">
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background transition-colors duration-500">
      <div className="max-w-2xl mx-auto bg-surface border border-border-ui shadow-2xl rounded-[2.5rem] p-8 md:p-12">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-4 border border-secondary/20">
            <PlusCircle className="text-secondary w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
            Add New <span className="text-secondary italic">Product</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* প্রোডাক্ট নেম */}
          <div className="relative group">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-secondary w-5 h-5" />
            <input 
              name="itemName" 
              type="text"
              placeholder="Product Name" 
              className="w-full pl-12 pr-4 py-4 bg-accent/5 border border-border-ui focus:border-secondary/50 rounded-2xl outline-none text-primary" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* প্রাইজ */}
            {/* <div className="relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-secondary w-5 h-5" />
              <input 
                name="price" 
                type="number" 
                step="0.01"
                placeholder="Price" 
                className="w-full pl-12 pr-4 py-4 bg-accent/5 border border-border-ui focus:border-secondary/50 rounded-2xl outline-none text-primary" 
                required 
              />
            </div> */}
<div className="relative group">
  {/* ডলার সাইনের বদলে টাকা (৳) সাইন */}
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-primary/30 group-focus-within:text-secondary select-none">
    ৳
  </span>
  
  <input 
    name="price" 
    type="number" 
    step="1" // টাকা সাধারণত ডেসিমাল ছাড়া হয়, চাইলে ০.০১ রাখতে পারেন
    placeholder="Price (TK)" 
    className="w-full pl-12 pr-4 py-4 bg-accent/5 border border-border-ui focus:border-secondary/50 rounded-2xl outline-none text-primary placeholder:text-primary/30" 
    required 
  />
</div>
            {/* ক্যাটাগরি */}
            <div className="relative group">
              <select 
                name="category" 
                className="w-full px-6 py-4 bg-accent/5 border border-border-ui focus:border-secondary/50 rounded-2xl outline-none text-primary appearance-none cursor-pointer"
              >
                <option value="Skincare">Skincare</option>
                <option value="Haircare">Haircare</option>
                <option value="Treatment">Treatment</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/30">▼</div>
            </div>
          </div>

          {/* ইমেজ আপলোড সেকশন */}
          <div className={`relative border-2 border-dashed ${imagePreview ? 'border-secondary/40' : 'border-border-ui'} rounded-3xl p-4 bg-accent/5 hover:bg-accent/10 transition-all`}>
            {imagePreview ? (
              <div className="relative h-64 w-full group">
                <img src={imagePreview} className="h-full w-full object-contain rounded-2xl shadow-inner" alt="Preview" />
                <button 
                  type="button" 
                  onClick={removeImage} 
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center py-12 gap-3 group">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
                  <UploadCloud className="w-7 h-7 text-secondary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-primary">Click to upload product image</p>
                  <p className="text-[10px] text-primary/40 uppercase tracking-widest mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </label>
            )}
          </div>

          {/* ডেসক্রিপশন */}
          <div className="relative group">
            <AlignLeft className="absolute left-4 top-5 text-primary/30 group-focus-within:text-secondary w-5 h-5" />
            <textarea 
              name="description" 
              placeholder="Product Description..." 
              rows="4" 
              className="w-full pl-12 pr-4 py-4 bg-accent/5 border border-border-ui focus:border-secondary/50 rounded-2xl outline-none text-primary" 
              required 
            />
          </div>

          {/* সাবমিট বাটন */}
          <button 
            type="submit"
            disabled={loading} 
            className="w-full bg-secondary hover:opacity-90 active:scale-[0.98] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
}