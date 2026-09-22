import { aboutContent } from "@/data/about";
import { browseProductsContent } from "@/data/browse-products";
import { categories } from "@/data/categories";
import { categoryPageContent } from "@/data/category-page";
import { homeContent } from "@/data/home";
import { productDetail } from "@/data/product-detail";
import { sampleListDetail } from "@/data/sample-list-detail";
import { sampleListsContent } from "@/data/sample-lists";
import { searchContent } from "@/data/search";
import { userLists } from "@/data/user";
import type {
  AboutContent,
  BrowseProductsContent,
  Category,
  CategoryPageContent,
  HomeContent,
  ProductDetail,
  SampleListDetail,
  SampleListsContent,
  SearchResults,
  UserList,
} from "@/types/content";

/**
 * Content access layer. Every function is async from day one so that swapping the fixture for a
 * Laravel fetch later changes no call sites (plan section 13). Components never import fixtures directly.
 */
export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export async function getAboutContent(): Promise<AboutContent> {
  return aboutContent;
}

export async function getSampleListsContent(): Promise<SampleListsContent> {
  return sampleListsContent;
}

export async function getSampleListDetail(slug: string): Promise<SampleListDetail> {
  return sampleListDetail(slug);
}

export async function getUserLists(): Promise<UserList[]> {
  return userLists;
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getBrowseProductsContent(): Promise<BrowseProductsContent> {
  return browseProductsContent;
}

export async function getCategoryPageContent(categorySlug: string, subcategorySlug?: string, page?: number): Promise<CategoryPageContent> {
  return categoryPageContent(categorySlug, subcategorySlug, page);
}

export async function getProductDetail(categorySlug: string, subcategorySlug: string, productSlug: string): Promise<ProductDetail> {
  return productDetail(categorySlug, subcategorySlug, productSlug);
}

export async function getSearchResults(query: string): Promise<SearchResults> {
  return searchContent(query);
}
