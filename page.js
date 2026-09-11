'use client';

import { useEffect, useMemo, useState } from 'react';

const translations = {
  or: {
    code: 'or', name: 'ଓଡ଼ିଆ', choose: 'ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ',
    tagline: 'ତାଜା କ୍ଷୀର ଏବଂ ଦୁଗ୍ଧଜାତ ଉତ୍ପାଦ',
    order: 'ଅର୍ଡର କରନ୍ତୁ', products: 'ଆମର ଉତ୍ପାଦ', availability: 'ଆଜିର ଉପଲବ୍ଧତା',
    available: 'କ୍ଷୀର ଉପଲବ୍ଧ', account: 'ମୋ ଆକାଉଣ୍ଟ', cart: 'କାର୍ଟ',
    delivery: 'ଡେଲିଭରୀ', payment: 'QR ଦ୍ୱାରା ପେମେଣ୍ଟ',
    contact: 'ଯୋଗାଯୋଗ', free: 'ମାଗଣା', total: 'ମୋଟ',
    empty: 'କାର୍ଟ ଖାଲି ଅଛି', saved: 'ଆପଣଙ୍କ ତଥ୍ୟ ସେଭ୍ ହୋଇଛି',
    name: 'ନାମ', mobile: 'ମୋବାଇଲ୍ ନମ୍ବର', address: 'ଠିକଣା',
    save: 'ତଥ୍ୟ ସେଭ୍ କରନ୍ତୁ', close: 'ବନ୍ଦ', remove: 'ହଟାନ୍ତୁ',
    checkout: 'ଚେକଆଉଟ୍', fullPay: 'ପୂରା ପେମେଣ୍ଟ', halfPay: '50% ପେମେଣ୍ଟ',
  },
  hi: {
    code: 'hi', name: 'हिन्दी', choose: 'अपनी भाषा चुनें',
    tagline: 'ताज़ा दूध और डेयरी उत्पाद', order: 'ऑर्डर करें',
    products: 'हमारे उत्पाद', availability: 'आज की उपलब्धता',
    available: 'दूध उपलब्ध है', account: 'मेरा अकाउंट', cart: 'कार्ट',
    delivery: 'डिलीवरी', payment: 'QR से भुगतान', contact: 'संपर्क',
    free: 'मुफ़्त', total: 'कुल', empty: 'कार्ट खाली है',
    saved: 'आपकी जानकारी सेव हो गई है', name: 'नाम', mobile: 'मोबाइल नंबर',
    address: 'पता', save: 'जानकारी सेव करें', close: 'बंद करें',
    remove: 'हटाएं', checkout: 'चेकआउट', fullPay: 'पूरा भुगतान', halfPay: '50% भुगतान',
  },
  en: {
    code: 'en', name: 'English', choose: 'Choose your language',
    tagline: 'Fresh Milk & Dairy Products', order: 'Order Now',
    products: 'Our Products', availability: "Today's Availability",
    available: 'Milk Available', account: 'My Account', cart: 'Cart',
    delivery: 'Delivery', payment: 'Pay by QR', contact: 'Contact',
    free: 'Free', total: 'Total', empty: 'Your cart is empty',
    saved: 'Your details have been saved', name: 'Name', mobile: 'Mobile Number',
    address: 'Address', save: 'Save Details', close: 'Close',
    remove: 'Remove', checkout: 'Checkout', fullPay: 'Full Payment', halfPay: '50% Payment',
  }
};

const products = [
  { id:'milk1', img:'/assets/milk.jpg', name:{or:'ତାଜା କ୍ଷୀର',hi:'ताज़ा दूध',en:'Fresh Milk'}, unit:{or:'/ ଲିଟର',hi:'/ लीटर',en:'/ litre'}, price:60, step:1 },
  { id:'milk250', img:'/assets/milk.jpg', name:{or:'କ୍ଷୀର 250ml',hi:'दूध 250ml',en:'Milk 250ml'}, unit:{or:'/ ବୋତଲ',hi:'/ बोतल',en:'/ bottle'}, price:15, step:1 },
  { id:'paneer250', img:'/assets/paneer.jpg', name:{or:'ପନିର 250g',hi:'पनीर 250g',en:'Paneer 250g'}, unit:{or:'/ ପ୍ୟାକେଟ୍',hi:'/ पैकेट',en:'/ pack'}, price:75, step:1 },
  { id:'paneer500', img:'/assets/paneer.jpg', name:{or:'ପନିର 500g',hi:'पनीर 500g',en:'Paneer 500g'}, unit:{or:'/ ପ୍ୟାକେଟ୍',hi:'/ पैकेट',en:'/ pack'}, price:150, step:1 },
  { id:'paneer2kg', img:'/assets/paneer.jpg', name:{or:'ପନିର 2kg',hi:'पनीर 2kg',en:'Paneer 2kg'}, unit:{or:'/ ପ୍ୟାକେଟ୍',hi:'/ पैकेट',en:'/ pack'}, price:600, step:1 },
  { id:'ghee', img:'/assets/ghee.jpg', name:{or:'ଘିଅ',hi:'घी',en:'Ghee'}, unit:{or:'/ କିଲୋ',hi:'/ किलो',en:'/ kg'}, price:1400, step:1 },
  { id:'dahi1', img:'/assets/dahi.jpg', name:{or:'ଦହି 1L',hi:'दही 1L',en:'Curd 1L'}, unit:{or:'/ ଲିଟର',hi:'/ लीटर',en:'/ litre'}, price:60, step:1 },
  { id:'dahi350', img:'/assets/dahi-350ml.jpg', name:{or:'ଦହି 350ml',hi:'दही 350ml',en:'Curd 350ml'}, unit:{or:'/ ପ୍ୟାକେଟ୍',hi:'/ पैकेट',en:'/ pack'}, price:20, step:1 },
  { id:'ras-medium', img:'/assets/rasagola.jpg', name:{or:'ରସଗୋଲା 10 pcs (Medium)',hi:'रसगुल्ला 10 पीस (Medium)',en:'Rasgulla 10 pcs (Medium)'}, unit:{or:'/ ବକ୍ସ',hi:'/ बॉक्स',en:'/ box'}, price:105, step:1 },
  { id:'ras-big', img:'/assets/rasagola.jpg', name:{or:'ରସଗୋଲା 10 pcs (Big)',hi:'रसगुल्ला 10 पीस (Big)',en:'Rasgulla 10 pcs (Big)'}, unit:{or:'/ ବକ୍ସ',hi:'/ बॉक्स',en:'/ box'}, price:180, step:1 },
  { id:'peda', img:'/assets/peda.jpg', name:{or:'ପେଡା 20 pcs (Medium)',hi:'पेड़ा 20 पीस (Medium)',en:'Peda 20 pcs (Medium)'}, unit:{or:'/ ବକ୍ସ',hi:'/ बॉक्स',en:'/ box'}, price:120, step:1 },
];

export default function Home() {
  const [lang, setLang] = useState('or');
  const [splash, setSplash] = useState(true);
  const [cart, setCart] = useState({});
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({name:'',mobile:'',address:''});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('pmd-lang');
    const savedCustomer = localStorage.getItem('pmd-customer');
    if (savedLang && translations[savedLang]) setLang(savedLang);
    if (savedCustomer) setForm(JSON.parse(savedCustomer));
    const timer = setTimeout(() => setSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const t = translations[lang];
  const items = useMemo(() => Object.entries(cart).map(([id, qty]) => ({p: products.find(x=>x.id===id), qty})).filter(x=>x.p), [cart]);
  const total = items.reduce((s,x)=>s+x.p.price*x.qty,0);
  const count = items.reduce((s,x)=>s+x.qty,0);

  function chooseLanguage(l) {
    setLang(l); localStorage.setItem('pmd-lang', l); setSplash(false);
  }
  function add(id) { setCart(c => ({...c, [id]:(c[id]||0)+1})); }
  function minus(id) { setCart(c => { const n={...c}; n[id]=(n[id]||0)-1; if(n[id]<=0) delete n[id]; return n; }); }
  function saveCustomer(e) {
    e.preventDefault();
    localStorage.setItem('pmd-customer', JSON.stringify(form));
    setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  }

  return (
    <>
      {splash && (
        <div className="splash">
          <div className="splashCard">
            <div className="brandMark">PMD</div>
            <h1>Padhan Milk Dairy</h1>
            <p>{t.choose}</p>
            <div className="langButtons">
              <button onClick={()=>chooseLanguage('or')}>ଓଡ଼ିଆ</button>
              <button onClick={()=>chooseLanguage('hi')}>हिन्दी</button>
              <button onClick={()=>chooseLanguage('en')}>English</button>
            </div>
            <small>3 seconds • ଚୟନ ନକଲେ ଓଡ଼ିଆ</small>
          </div>
        </div>
      )}

      <header className="header">
        <div className="top">
          <a href="#home" className="brand">
            <img src="/assets/logo.jpg" alt="Padhan Milk Dairy logo"/>
            <div><b>Padhan Milk Dairy</b><span>Freshness • Purity • Healthy Life</span></div>
          </a>
          <div className="contactTop">
            <a href="tel:9938997299">📞 9938997299</a>
            <a href="tel:9668154062">9668154062</a>
          </div>
          <button className="accountBtn" onClick={()=>setAccountOpen(true)}>👤 {t.account}</button>
          <button className="cartBtn" onClick={()=>setCartOpen(true)}>🛒 {t.cart}<i>{count}</i></button>
        </div>
        <nav>
          <a href="#home">Home</a><a href="#products">{t.products}</a><a href="#delivery">{t.delivery}</a><a href="#payment">{t.payment}</a><a href="#contact">{t.contact}</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="heroText">
            <span className="pill">LOCAL • FRESH • TRUSTED</span>
            <h2>Padhan Milk Dairy</h2>
            <p>{t.tagline}</p>
            <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>🛒 {t.order}</button>
          </div>
          <img src="/assets/hero-products.jpg" alt="Milk, paneer and dairy products"/>
        </section>

        <section className="availability">
          <div><span>🥛</span><div><strong>{t.availability}</strong><b>{t.available}</b><em>Available: 325 L</em></div></div>
          <div className="trust"><span>🌿 100% Fresh</span><span>🐄 Local Dairy</span><span>✓ Hygienic</span></div>
        </section>

        <section className="offer">
          <div className="offerIcon">🎁</div>
          <div>
            <span className="offerTag">MONTHLY PLAN</span>
            <h2>
              {lang==='or' ? 'ମାସିକ ପ୍ଲାନ୍ ଓ ଅଫର୍' : lang==='hi' ? 'मासिक प्लान और ऑफर' : 'Monthly Plans & Offers'}
            </h2>
            <p>
              {lang==='or'
                ? 'ପରେ ମାଲିକ ମାସିକ ଦୁଧ/ପନିର ପ୍ଲାନ୍ ଓ ଅଫର୍ ଯୋଡ଼ି ପାରିବେ।'
                : lang==='hi'
                ? 'बाद में मालिक मासिक दूध/पनीर प्लान और ऑफर जोड़ सकते हैं।'
                : 'The owner can add monthly milk/paneer plans and offers later.'}
            </p>
          </div>
          <button onClick={()=>setAccountOpen(true)}>
            {lang==='or' ? 'ପ୍ଲାନ୍ ଦେଖନ୍ତୁ' : lang==='hi' ? 'प्लान देखें' : 'View Plans'}
          </button>
        </section>

        <section id="products" className="section">
          <div className="sectionTitle"><div><span>🛍️</span><h2>{t.products}</h2></div><small>Simple • Easy • Mobile Friendly</small></div>
          <div className="products">
            {products.map(p=>(
              <article className="card" key={p.id}>
                <img src={p.img} alt={p.name[lang]}/>
                <div className="cardBody">
                  <h3>{p.name[lang]}</h3>
                  <strong>₹{p.price}<small> {p.unit[lang]}</small></strong>
                  <div className="qty"><button onClick={()=>minus(p.id)}>−</button><span>{cart[p.id]||0}</span><button onClick={()=>add(p.id)}>+</button></div>
                  <button className="order" onClick={()=>add(p.id)}>🛒 {t.order}</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="delivery" className="delivery">
          <h2>🚚 {t.delivery}</h2>
          <div className="deliveryGrid">
            <div><b>0–5 KM</b><strong>{t.free}</strong><p>Home delivery</p></div>
            <div><b>Big Quantity • 0–10 KM</b><strong>{t.free}</strong><p>Large orders</p></div>
            <div><b>Small • 5–15 KM</b><strong>₹20</strong><p>Delivery charge</p></div>
            <div><b>Big • 15–25 KM</b><strong>₹40</strong><p>Delivery charge</p></div>
          </div>
        </section>

        <section id="payment" className="payment">
          <div><h2>💳 {t.payment}</h2><p>Scan the QR with PhonePe. Payment verification will be connected in the backend.</p>
            <div className="payOptions"><button onClick={()=>alert(t.fullPay)}>100% {t.fullPay}</button><button onClick={()=>alert(t.halfPay)}>50% {t.halfPay}</button></div>
          </div>
          <img src="/assets/phonepe-qr.jpg" alt="PhonePe QR for Dolamani Padhan"/>
        </section>

        <section className="info">
          <div><span>🥛</span><h3>Fresh & Local</h3><p>Daily dairy products with a simple ordering experience.</p></div>
          <div><span>📦</span><h3>Safe Packing</h3><p>Milk bottle and paneer packet options are clearly shown.</p></div>
          <div><span>📱</span><h3>Easy on Mobile</h3><p>Large buttons, clear prices and minimal typing.</p></div>
        </section>
      </main>

      <footer id="contact">
        <div><h2>Padhan Milk Dairy</h2><p>Owner: Dolamani Padhan</p><a href="tel:9938997299">9938997299</a> • <a href="tel:9668154062">9668154062</a></div>
        <div><h3>Address</h3><p>India • Odisha • Sundargarh • Hemgir<br/>P.O. Bilaimunda • G.P. Mundherkhet<br/>Village: Podajhalanga</p><a target="_blank" href="https://maps.app.goo.gl/8CH8FZtQqv2UXQnx7">📍 Open Map</a></div>
      </footer>

      {accountOpen && <div className="overlay" onClick={()=>setAccountOpen(false)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <button className="x" onClick={()=>setAccountOpen(false)}>×</button>
          <h2>👤 {t.account}</h2>
          <form onSubmit={saveCustomer}>
            <label>{t.name}<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
            <label>{t.mobile}<input required inputMode="tel" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/></label>
            <label>{t.address}<textarea required value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label>
            <button className="primary">{t.save}</button>
          </form>
          {saved && <p className="success">✓ {t.saved}</p>}
        </div>
      </div>}

      {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <button className="x" onClick={()=>setCartOpen(false)}>×</button>
          <h2>🛒 {t.cart}</h2>
          {items.length===0 ? <p>{t.empty}</p> : <>
            {items.map(x=><div className="cartRow" key={x.p.id}><span>{x.p.name[lang]} × {x.qty}</span><b>₹{x.p.price*x.qty}</b><button onClick={()=>minus(x.p.id)}>{t.remove}</button></div>)}
            <div className="cartTotal"><span>{t.total}</span><b>₹{total}</b></div>
            <button className="primary" onClick={()=>{setCartOpen(false);setAccountOpen(true)}}>{t.checkout}</button>
          </>}
        </div>
      </div>}
    </>
  );
}
