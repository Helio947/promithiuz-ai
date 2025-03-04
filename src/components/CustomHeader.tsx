
import Header from "@/components/Header";
import Logo from "@/components/ui/Logo";

const CustomHeader = () => {
  return (
    <div className="relative">
      <Header />
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <Logo size="lg" />
      </div>
    </div>
  );
};

export default CustomHeader;
