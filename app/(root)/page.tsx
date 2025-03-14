import { Button } from "@/components/ui/button";
import CategoryFilter from "@/components/ui/shared/CategoryFilter";
import Collection from "@/components/ui/shared/Collection";
import Search from "@/components/ui/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({searchParams}:SearchParamProps) {
const page=Number(searchParams?.page)| 1;
const searchText=(searchParams?.query as string)|| '';
const category=(searchParams?.category as string)|| '';
const events = await getAllEvents({
    query:searchText,
    category,
    page,
    limit:6
  })
  return (
   <>
  <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 ">
<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
<div className="flex flex-col justify-center gap-8 ">
<h1 className="h1-bold">
Host,Connect, Celebrate:Your Event,Our Platform
</h1>
<p className="p-regular-20 md:p-regular-24">
  Book and learn helpful tips from 3,168+ mentors in word-class companies with our global community.
</p>
<Button className="button w-full sm:w-fit" size={"lg"} asChild>
  <Link href='#events'>
  Explor Now
  </Link>
</Button>
</div>
<Image className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] " src='/assets/images/hero.png' alt="hero" width={1000} height={1000}/>
</div>
  </section>
  <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
<h2 className="h2-bold">
Trust by <br/> Thousands of Events
</h2>

<div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

<Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
  </section>
   </>
  );
}
