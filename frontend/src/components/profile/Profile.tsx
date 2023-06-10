import Avatar from "../avatar/Avatar";
import { OwnerIsCompany, OwnerIsPerson } from "../models/Owner";

export default function Profile({ data }: { data: OwnerIsPerson }) {

  const birthdate = new Date(data.birthdate);
  const day = birthdate.getDate().toString().padStart(2, '0');
  const month = (birthdate.getMonth() + 1).toString().padStart(2, '0');
  const year = birthdate.getFullYear();
  const formattedBirthdate = `${day}/${month}/${year}`;

  return (
    <div className="m-10">
      {/* <Avatar gender={data.sex} /> */}
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">{data.name}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.sex}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Birthdate</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formattedBirthdate}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Ssn</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.ssn}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Birthplace</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.birthplace}</dd>
            </div>
          </dl>
        </div>
        <div>
          <div className="mt-6 border-t border-gray-100">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Cars List</h3>
            <ul className="px-4 py-6 divide-y divide-gray-100">
              {data.cars_list.map((car) => (
                <li key={car} className="flex items-center py-4">
                  <a href={car} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://example.com/images/${car}.jpg`}
                      alt="Car"
                      className="w-24 h-24 object-cover mr-4"
                    />
                  </a>
                  <span className="truncate font-medium">{car}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
