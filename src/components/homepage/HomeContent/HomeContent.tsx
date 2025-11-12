import { FC, useContext } from "react";
import { HomeContext } from "@/context";

export interface HomeContentProps {}

export const HomeContent: FC<HomeContentProps> = () => {
  const { cmsPageContent } = useContext(HomeContext);

  return (
    <div className="prose max-w-none">
      {cmsPageContent?.content && (
        <div
          dangerouslySetInnerHTML={{ __html: cmsPageContent.content }}
        />
      )}
    </div>
  );
};
