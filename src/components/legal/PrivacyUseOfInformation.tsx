/**
 * Body of the "Use of your personal information" row (Figma 1264:950 onward) - too structurally specific to
 * express through LegalBody's generic paragraph/bullet markdown: two numbered lead-in sentences (badges, not
 * plain text - Figma 1264:959/978, dark squares with a white number), the second followed by a long bullet
 * list, one of whose items itself contains three roman-numeral sub-points as blank-line-separated text within
 * that SAME bullet (Figma 1264:977) rather than a nested list. Kept as its own one-off component rather than
 * extending the shared renderer for a structure nothing else on the site uses.
 */
function NumberBadge({ n }: { n: number }) {
  return <span className="flex h-[33px] w-[33px] shrink-0 items-center justify-center bg-ink font-display text-label font-bold text-cream">{n}</span>;
}

export function PrivacyUseOfInformation() {
  return (
    <div className="flex flex-col gap-4 font-sans text-body">
      <div className="flex items-start gap-5">
        <NumberBadge n={1} />
        <p className="font-display text-h3 font-medium text-ink">
          When you register with us and/or use this site, some of our services will require further details from you in order for us to set up, deliver and
          maintain those services. In addition, we may gather information about your use of the website, including via cookies (see our Cookie Declaration).
        </p>
      </div>
      <ul className="ml-[53px] flex flex-col gap-2 pl-5">
        <li className="list-disc">Some of our services will require further details from you in order for us to set up, deliver and maintain those services.</li>
        <li className="list-disc">In addition we may gather information about your use of the website, including via the use of cookies (see our Cookie Declaration).</li>
      </ul>

      <div className="mt-2 flex items-start gap-5">
        <NumberBadge n={2} />
        <p className="font-display text-h3 font-medium text-ink">
          We may use information you give us directly, or information acquired during time spent with you — including face-to-face consultations and over
          the phone. This information is used
        </p>
      </div>
      <ul className="ml-[53px] flex flex-col gap-2 pl-5">
        <li className="list-disc">to register you with our website and to manage any account you hold with us</li>
        <li className="list-disc">
          to give to companies and organisations whose products we provide to you — e.g. when a direct home delivery is scheduled from a manufacturer, we
          will supply your name, address and order details
        </li>
        <li className="list-disc">to fulfil our agreement with you, to process your order and to obtain payment</li>
        <li className="list-disc">
          <p>to analyse and profile your shopping preferences (market, customer and product analysis) to enable us</p>
          <p className="mt-4">i. to provide you with a personalised browsing experience when using the website</p>
          <p className="mt-4">
            ii. to review, develop and improve the events, products and services which we offer and to enable us to provide you and our other customers
            with relevant information through our marketing activities
          </p>
          <p className="mt-4">iii. to provide you with a unique and bespoke shopping experience tailored to you and your family</p>
        </li>
        <li className="list-disc">to administer any prize draws or competitions you may enter</li>
        <li className="list-disc">to facilitate your transaction and browsing experience with us</li>
        <li className="list-disc">
          we may use your information to make decisions about you using computerised technology — for example, automatically selecting products and/or
          services we think will interest you from the information we hold
        </li>
        <li className="list-disc">
          <p>
            where you have agreed that we may do so, we may keep you informed about events, products and services (including those of other companies and
            organisations, and including special offers, discounts, competitions, warranties, product recalls and so on) which we consider may be of
            interest to you by any of the following methods:
          </p>
          <ul className="mt-2 flex flex-col gap-1 pl-5">
            <li>– Email</li>
            <li>– Telephone (including voicemail messages)</li>
            <li>– SMS text messages and other electronic messages such as picture messaging</li>
            <li>– WhatsApp</li>
            <li>– Post</li>
            <li>– Social media</li>
            <li>– Word of mouth (i.e. via other clients)</li>
          </ul>
        </li>
        <li className="list-disc">
          If you do not wish to receive information about our events, products and services which may be of interest to you from us, you can select the
          opt-out option when you submit your details, or unsubscribe at any time — see “Do you want to be removed from the Anita’s List email newsletter
          list?” below.
        </li>
        <li className="list-disc">
          We may supplement the information you provide with information we receive from third parties — for example, personal assistants, referrals from
          obstetricians or ante-natal classes, friends or other family members, and credit reference agencies should we need to use them in the event of
          non-payment for goods.
        </li>
        <li className="list-disc">We may engage third-party payment providers to administer and process your payment card details in order to complete any purchase you make through the website.</li>
        <li className="list-disc">We may store and process your information on our own systems, or on systems owned by third parties acting on our behalf.</li>
      </ul>
    </div>
  );
}
