interface CommunityLayoutProps {
  children: React.ReactNode;
}

const CommunityLayout = ({ children }: CommunityLayoutProps) => {
  return (
    <div
      className="
        h-full w-full flex flex-col gap-y-4 items-center justify-center
        bg-slate-500"
    >
      {children}
    </div>
  );
};

export default CommunityLayout;
