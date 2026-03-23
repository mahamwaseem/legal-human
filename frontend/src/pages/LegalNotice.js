import React, { useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import './Legal.css';

export default function LegalNotice() {
  const { lang } = useLang();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="legal-page page-enter">
      <section className="page-header">
        <div className="container">
         
          <h1 className="section-title">{lang === 'es' ? 'Aviso Legal' : 'Legal Notice'}</h1>
          <div className="divider"></div>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-body">
            
            <div className="legal-block">
              <h2>{lang === 'es' ? '1. Identificación del Responsable' : '1. Identification of the Responsible Party'}</h2>
              <p>
                {lang === 'es' 
                  ? 'En cumplimiento de lo dispuesto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios que este sitio web es propiedad de Legal Human, con domicilio social en Calle Almacil, 5, Apt. 10, 5ª Planta, 46920, Mislata (Valencia), España.'
                  : 'In compliance with the provisions of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSI-CE), users are informed that this website is owned by Legal Human, with registered address at Calle Almacil, 5, Apt. 10, 5th Floor, 46920, Mislata (Valencia), Spain.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Para cualquier duda o comunicación, los usuarios pueden contactar con Legal Human a través del correo electrónico asesorialegalhuman@gmail.com o por teléfono en el +34 665 12 77 58.'
                  : 'For any inquiries or communications, users may contact Legal Human via email at asesorialegalhuman@gmail.com or by phone at +34 665 12 77 58.'}
              </p>
            </div>

            <div className="legal-block">
              <h2>{lang === 'es' ? '2. Objeto del Sitio Web' : '2. Website Purpose'}</h2>
              <p>
                {lang === 'es'
                  ? 'El objeto de este sitio web es facilitar información relacionada con los servicios de asesoría fiscal, defensa fiscal y servicios para solicitudes ante oficinas de extranjería y defensa ante la Administración.'
                  : 'The purpose of this website is to provide information related to tax advisory services, tax defense, and services for applications before immigration offices and defense before the Administration.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'El contenido publicado en este sitio web tiene una finalidad meramente informativa y está dirigido a personas que deseen optimizar su fiscalidad o resolver dudas relacionadas con la fiscalidad y la extranjería.'
                  : 'The content published on this website is for informational purposes only and is intended for individuals who wish to optimize their taxation or resolve tax-related and immigration-related inquiries.'}
              </p>
            </div>

            <div className="legal-block">
              <h2>{lang === 'es' ? '3. Derechos de Propiedad Intelectual e Industrial' : '3. Intellectual and Industrial Property Rights'}</h2>
              <p>
                {lang === 'es'
                  ? 'Todos los elementos que integran este sitio web, incluyendo textos, imágenes, gráficos, logotipos, iconos, archivos de software, diseños o cualquier otro contenido, son propiedad exclusiva de Legal Human o de terceros que han autorizado su uso.'
                  : 'All elements that make up this website, including texts, images, graphics, logos, icons, software files, designs, or any other content, are the exclusive property of Legal Human or of third parties who have authorized their use.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Queda estrictamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de los contenidos sin el consentimiento previo, expreso y por escrito de Legal Human.'
                  : 'The reproduction, distribution, public communication, modification, or any other form of exploitation of the content is strictly prohibited without the prior express written consent of Legal Human.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'El mero acceso al sitio web no otorga al usuario derecho alguno sobre las marcas, nombres comerciales o signos distintivos incorporados en el mismo.'
                  : 'Merely accessing the website does not grant the user any rights to use the trademarks, trade names, or distinctive signs incorporated therein.'}
              </p>
            </div>

            <div className="legal-block">
              <h2>{lang === 'es' ? '4. Uso del Sitio Web' : '4. Use of the Website'}</h2>
              <p>
                {lang === 'es'
                  ? 'El usuario se compromete a hacer un uso diligente, correcto y lícito del sitio web y de sus contenidos, absteniéndose de:'
                  : 'The user agrees to use the website and its contents diligently, correctly, and lawfully, refraining from:'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Realizar actividades ilícitas o contrarias a la buena fe y al orden público. Provocar daños en los sistemas físicos o lógicos de Legal Human o de terceros. Intentar acceder a áreas restringidas o datos personales sin autorización. Utilizar los contenidos del sitio web con fines comerciales no autorizados.'
                  : 'Engaging in illegal activities or actions contrary to good faith and public order. Damaging or causing harm to the physical or logical systems of Legal Human or third parties. Attempting to access restricted areas or personal data without authorization. Using the website’s contents for unauthorized commercial purposes.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Legal Human se reserva el derecho de restringir o denegar el acceso al sitio web a los usuarios que incumplan estas obligaciones.'
                  : 'Legal Human reserves the right to restrict or deny access to the website to users who fail to comply with these obligations.'}
              </p>
            </div>

            <div className="legal-block">
              <h2>{lang === 'es' ? '5. Exención de Responsabilidad' : '5. Disclaimer of Liability'}</h2>
              <p>
                {lang === 'es'
                  ? 'Legal Human no garantiza la inexistencia de errores en el contenido del sitio web, ni su disponibilidad ininterrumpida, si bien adoptará las medidas necesarias para evitarlos y subsanarlos cuando proceda.'
                  : 'Legal Human does not guarantee the absence of errors in the website’s content, nor its uninterrupted availability, although it will take the necessary measures to prevent and correct them when appropriate.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Asimismo, Legal Human no se hace responsable de: Los daños o perjuicios derivados del uso de la información publicada sin un asesoramiento profesional individualizado. Las pérdidas causadas por interrupciones o fallos informáticos ajenos a su voluntad. Los contenidos externos de terceros a los que el sitio web pueda enlazar, ya que no ejerce control sobre dichas páginas.'
                  : 'Furthermore, Legal Human shall not be held liable for: Damages or losses resulting from the use of the information published without individualized professional advice. Losses caused by interruptions or computer failures beyond its control. External third-party content to which the website may link, as it does not exercise control over such pages.'}
              </p>
            </div>

            <div className="legal-block">
              <h2>{lang === 'es' ? '6. Legislación Aplicable y Jurisdicción' : '6. Governing Law and Jurisdiction'}</h2>
              <p>
                {lang === 'es'
                  ? 'Las presentes condiciones se regirán por la legislación española. Para la resolución de cualquier conflicto o controversia relacionada con el acceso o uso de este sitio web, las partes se someten expresamente a la jurisdicción de los Juzgados de Valencia, salvo que la ley aplicable establezca lo contrario.'
                  : 'These terms and conditions shall be governed by Spanish law. For the resolution of any conflict or dispute related to the access or use of this website, the parties expressly submit to the jurisdiction of the Courts of Valencia, unless applicable law establishes otherwise.'}
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}