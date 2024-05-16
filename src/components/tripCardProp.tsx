import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";

interface TripCardPropProps {
  icon: MaterialSymbolProps["icon"];
  title: string;
}

export default function TripCardProp({ icon, title }: TripCardPropProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <MaterialSymbol icon={icon} size={20} />
      <p>{title}</p>
    </div>
  );
}
