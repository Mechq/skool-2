export default function UserWorkshopCard({ userWorkshop }) {
    return (
        <>
            <a href="#"
               className="mb-4 block max-w-md p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
                <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 light:text-white">{userWorkshop.title}</h5>
                <p className="font-normal text-gray-700 light:text-gray-400">{userWorkshop.description}</p>
            </a>
        </>
    );
}