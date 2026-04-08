import TopSection from "../components/createfoodpage/TopSection";
import CreateFoodForm from "../components/createfoodpage/CreateFoodForm";

const CreateFoodPage = () => {
  return (
    <section className="bg-cards-dark-bg max-w-auto rounded-xl border border-green-highlight">
      <div className="flex flex-col justify-center items-center ">
        <TopSection />

        <div className="h-px w-full bg-bg-breakline" />

        <CreateFoodForm />
      </div>
    </section>
  );
};

export default CreateFoodPage;
