export default function CarPage({car}) {
  const entries = Object.entries(car);
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Car Information</h2>
          <p className="mt-4 text-gray-500">
            This car is owned by <a href="#">{car.owner_id}</a>
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          {entries
            .filter(([name]) => !["car_id", "size", "vin", "owner_id"].includes(name))
            .map(([name, value]) => (
              <div key={name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{value}</dd>
              </div>
            ))}

          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/20210610-01-03-1623259908.jpg?crop=1.00xw:0.892xh;0,0.0855xh&resize=1200:*"
            alt="toyota land cruiser"
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/20210610-01-02-1623259894.jpg?crop=1xw:1xh;center,top&resize=980:*"
            alt="toyota land cruiser"
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/20210610-01-03-1623259908.jpg?crop=1xw:1xh;center,top&resize=980:*"
            alt="toyota land cruiser"
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/20210610-01-05-1623259894.jpg?crop=1xw:1xh;center,top&resize=980:*"
            alt="toyota land cruiser"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  )
}
