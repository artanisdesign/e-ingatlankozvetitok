export function EnglishPricing() {
  return (
    <div className=" mb-20 rounded-xl bg-gray-50/80 dark:bg-gray-900/60">
      <div className="mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-12">
        <div className="mx-auto mb-4  text-left lg:mb-8">
          <h2 className="mb-6 text-3xl font-bold dark:text-white md:text-3xl md:leading-tight lg:text-4xl">
            Our Pricing
          </h2>

          <p>
            We aim for transparency and affordability, ensuring you receive
            value every step of the way.
          </p>
        </div>

        <div className="hidden  border-b border-teal-200/80 p-2 pb-4 dark:border-teal-100/20 md:block">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-2">
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-500">
                Service Name
              </span>
            </div>

            <div className="col-span-2">
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-500">
                HUF (Gross)
              </span>
            </div>

            <div className="col-span-2">
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-500">
                EUR (Approximately)
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Sale and Purchase Agreement for Residential Property
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>0.45%</strong> of the purchase price (Min. 150,000
                  HUF; Max. 600,000 HUF)
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>0.45%</strong> of the purchase price (Min. 375 EUR;
                  Max. 1500 EUR)
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Bilingual Document Drafting
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  Base fee + <strong>150,000 HUF</strong>
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  Base fee + <strong>375 EUR</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Handling of Cash Deposit
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  1% of the deposited amount per year (Calculated over 365 days,
                  Min. 130,000 HUF)
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  1% of the deposited amount per year (Calculated over 365 days,
                  Min. 325 EUR)
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Sale and Purchase Agreement for Chattels
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>50,000 HUF</strong>
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>125 EUR</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Co-Ownership Agreement
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  From <strong>100,000 HUF</strong>
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  From <strong>250 EUR</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                On-site Visit (Signing outside of our offices)
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>30,000 HUF</strong>
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>75 EUR</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Power of Attorney
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>50,000 HUF</strong>
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>125 EUR</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Sale and Purchase Agreement for Non-Residential Property,
                including Land, Garage etc.
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>0.75%</strong> of the purchase price (Min. 150,000
                  HUF; Max. 600,000 HUF)
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>0.75%</strong> of the purchase price (Min. 375 EUR;
                  Max. 1500 EUR)
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Legal Advice for Purchasing a New Build Property (1+1 hour)
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>49,000 HUF</strong>
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>125 EUR</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Pre-transaction Legal Advice (1+1 hour)
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>49,000 HUF</strong> (Fee deducted from subsequent sale
                  and purchase agreement drafting fee)
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>125 EUR</strong> (Fee deducted from subsequent sale
                  and purchase agreement drafting fee)
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-2 space-y-4 lg:space-y-0">
          <ul className="grid grid-cols-1 gap-2 p-2 md:grid-cols-6 lg:gap-6">
            <li className="pb-1.5 md:col-span-2 lg:py-3">
              <span className="text-md font-semibold text-teal-600 dark:text-teal-500 md:text-current dark:md:text-teal-300 lg:text-lg">
                Drafting and Counter-signing a Preliminary Agreement
              </span>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold  text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  HUF (Gross)
                </span>
                <p>
                  <strong>100,000</strong> HUF (Fee deducted from subsequent
                  sale and purchase agreement drafting fee)
                </p>
              </div>
            </li>

            <li className="col-span-2 border-b border-gray-200 py-1.5 dark:border-neutral-800 lg:py-3">
              <div className="grid grid-cols-2 md:block">
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 md:hidden lg:hidden">
                  EUR (Approx.)
                </span>
                <p>
                  <strong>250 EUR</strong> (Fee deducted from subsequent sale
                  and purchase agreement drafting fee)
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-center gap-x-3 md:mt-12">
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Although our members typically issue their invoices in HUF, clients
            may also pay in EUR or USD, with the conversion based on the
            official exchange rate published by the Hungarian National Bank on
            the day the invoice is issued.
          </p>
        </div>
      </div>
    </div>
  )
}
