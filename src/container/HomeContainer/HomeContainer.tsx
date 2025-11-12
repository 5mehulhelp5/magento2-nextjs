"use client";
import { HomeContext } from "@/context";
import { useStoreConfig } from "@/hooks";
import { Queries } from "@/utils/graphql";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import { HomeContent } from "@/components";
import { FullPageLoading } from "@/components";

export interface CmsPage {
  title?: string;
  content?: string;
  content_heading?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  page_layout?: string;
  url_key?: string;
  identifier?: string;
}

export interface HomeContainerProps {}

export const HomeContainer: FC<HomeContainerProps> = () => {
  const { storeConfig } = useStoreConfig();
  const cmsHomePageIdentifier = storeConfig?.cms_home_page || "home";
  const { data, loading, error } = useQuery(Queries.GET_CMS_HOME_PAGE, {
    variables: { identifier: cmsHomePageIdentifier },
    skip: !cmsHomePageIdentifier,
  });

  const cmsPageContent = data?.cmsPage || null;

  if (loading) {
    return <FullPageLoading />;
  }

  if (error) {
    console.error("Error fetching CMS home page content:", error);
  }

  return (
    <HomeContext.Provider
      value={{
        cmsPageContent
      }}
    >
      <HomeContent />
    </HomeContext.Provider>
  );
};
