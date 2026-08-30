import type { ReactNode } from "react";

type AdminDataViewProps = {
  table: ReactNode;
  cards: ReactNode;
};

export function AdminDataView({ table, cards }: AdminDataViewProps) {
  return (
    <>
      <div className="space-y-3 md:hidden">{cards}</div>
      <div className="hidden md:block">{table}</div>
    </>
  );
}
