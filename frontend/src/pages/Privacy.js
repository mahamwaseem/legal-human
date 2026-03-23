import React, { useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import './Legal.css';

export default function Privacy() {
  const { lang } = useLang();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="legal-page page-enter">
      <section className="page-header">
        <div className="container">

          <h1 className="section-title">{lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</h1>
          <div className="divider"></div>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-body">

            {/* Intro */}
            <div className="legal-block">
              <p>
                {lang === 'es'
                  ? 'Respetando lo establecido en la legislación vigente, Legal Human (en adelante, el Sitio Web) se compromete a adoptar las medidas técnicas y organizativas necesarias, de conformidad con el nivel de seguridad adecuado al riesgo de los datos recogidos.'
                  : 'Respecting the provisions of current legislation, Legal Human (hereinafter, the Website) undertakes to adopt the necessary technical and organizational measures in accordance with the level of security appropriate to the risk of the data collected.'}
              </p>
            </div>

            {/* Laws */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Leyes incorporadas en esta política de privacidad' : 'Laws incorporated into this privacy policy'}</h2>
              <p>
                {lang === 'es'
                  ? 'Esta política de privacidad está adaptada a la normativa española y europea vigente en materia de protección de datos personales en internet. En concreto, cumple con las siguientes normativas:'
                  : 'This privacy policy is adapted to the current Spanish and European regulations on the protection of personal data on the internet. Specifically, it complies with the following regulations:'}
              </p>
              <ul className="legal-list">
                <li>
                  {lang === 'es'
                    ? 'Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD).'
                    : 'Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (GDPR).'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).'
                    : 'Organic Law 3/2018 of 5 December on the Protection of Personal Data and guarantee of digital rights (LOPD-GDD).'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Real Decreto 1720/2007, de 21 de diciembre, por el que se aprueba el Reglamento de desarrollo de la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal (RDLOPD).'
                    : 'Royal Decree 1720/2007 of 21 December, approving the Regulations implementing Organic Law 15/1999 of 13 December on the Protection of Personal Data (RDLOPD).'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).'
                    : 'Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE).'}
                </li>
              </ul>
            </div>

            {/* Identity */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Identidad del responsable del tratamiento' : 'Identity of the data controller'}</h2>
              <p><strong>{lang === 'es' ? 'Nombre: ' : 'Name: '}</strong>Yasmina Maini Dabdoub</p>
              <p><strong>{lang === 'es' ? 'Dirección: ' : 'Address: '}</strong>Calle Almacil, 5, Door 10, 5th Floor, 46920, Mislata (Valencia), Spain.</p>
              <p><strong>{lang === 'es' ? 'Teléfono de contacto: ' : 'Contact phone: '}</strong>+34 665 12 77 58</p>
              <p><strong>{lang === 'es' ? 'Correo electrónico de contacto: ' : 'Contact email: '}</strong>asesorialegalhuman@gmail.com</p>
            </div>

            {/* Collection */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Recogida de datos personales' : 'Collection of personal data'}</h2>
              <p>
                {lang === 'es'
                  ? 'Los datos personales tratados en Legal Human proceden del propio interesado.'
                  : 'The personal data processed by Legal Human come from the data subject themselves.'}
              </p>
              <p>{lang === 'es' ? 'Las categorías de datos que se tratan son:' : 'The categories of data processed are:'}</p>
              <ul className="legal-list">
                <li>{lang === 'es' ? 'Datos identificativos.' : 'Identifying data.'}</li>
                <li>{lang === 'es' ? 'Direcciones postales y electrónicas.' : 'Postal and email addresses.'}</li>
                <li>{lang === 'es' ? 'Información comercial.' : 'Commercial information.'}</li>
                <li>{lang === 'es' ? 'Datos económicos.' : 'Financial data.'}</li>
                <li>{lang === 'es' ? 'Tratamiento de datos de clientes potenciales y contactos web.' : 'Processing of data from potential clients and website contacts.'}</li>
              </ul>
              <p>
                {lang === 'es'
                  ? 'Solo se recogen los datos personales estrictamente necesarios para la finalidad de la relación contractual con el interesado.'
                  : 'Only the personal data required for the purpose of the contractual relationship with the data subject are collected.'}
              </p>
            </div>

            {/* Purpose */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Finalidad del tratamiento de los datos personales' : 'Purpose of personal data processing'}</h2>
              <p>
                {lang === 'es'
                  ? 'Legal Human recaba y gestiona los datos personales con la finalidad de poder facilitar, agilizar y cumplir los compromisos establecidos entre el Sitio Web y el Usuario o el mantenimiento de la relación que se establezca en los formularios que este último rellene o para atender una solicitud o consulta.'
                  : 'Legal Human collects and manages personal data for the purpose of facilitating, streamlining, and fulfilling the commitments undertaken between the Website and the User, as well as to maintain the relationship arising from any forms the User completes or to address any requests or inquiries made.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Adicionalmente, los datos podrán ser utilizados con una finalidad comercial de personalización, operativa y estadística, y actividades propias del objeto social de Legal Human, así como para la extracción, almacenamiento de datos y estudios de marketing para adecuar el Contenido ofertado al Usuario, así como mejorar la calidad, funcionamiento y navegación del Sitio Web.'
                  : 'In addition, the data may be used for commercial, personalization, operational, and statistical purposes, as well as for activities related to the corporate purpose of Legal Human. They may also be used for information extraction and storage, and for conducting marketing studies to tailor the content offered to the User and improve the quality, functionality, and browsing experience on the Website.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'En el momento en que se recaben los datos personales, se informará al Usuario acerca de la finalidad o finalidades específicas del tratamiento a que se destinarán los datos personales; es decir, el uso que se hará de la información recopilada.'
                  : 'At the time of data collection, the User will be informed of the specific purpose or purposes for which the data will be processed; that is, the use that will be made of the information provided.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Legal Human no realiza decisiones automatizadas ni elaboración de perfiles.'
                  : 'Legal Human does not make automated decisions or carry out profiling.'}
              </p>
            </div>

            {/* Personal Data Record */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Registro de Datos de Carácter Personal' : 'Personal Data Record'}</h2>
              <p>
                {lang === 'es'
                  ? 'En cumplimiento de lo establecido en el RGPD y la LOPD-GDD, le informamos que los datos personales recabados por Legal Human, mediante los formularios extendidos en el Sitio Web quedarán incorporados y serán tratados en nuestros ficheros con el fin de poder facilitar, agilizar y cumplir los compromisos establecidos entre Legal Human y el Usuario, así como para atender las solicitudes o consultas que este realice.'
                  : 'In compliance with the provisions of the GDPR and the LOPD-GDD, the User is informed that the personal data collected by Legal Human through the forms available on the Website will be incorporated into and processed in our files for the purpose of facilitating, streamlining, and fulfilling the commitments established between Legal Human and the User, as well as to maintain the relationship arising from any forms the User completes or to address any requests or inquiries they may make.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Asimismo, de conformidad con lo establecido en el RGPD y la LOPD-GDD, a menos que sea de aplicación la excepción prevista en el artículo 30.5 del RGPD, Legal Human mantiene un registro de actividades de tratamiento que especifica, según sus finalidades, las actividades de tratamiento llevadas a cabo y las demás circunstancias establecidas en la normativa vigente.'
                  : 'Furthermore, in accordance with the GDPR and the LOPD-GDD, unless the exception provided in Article 30.5 of the GDPR applies, Legal Human maintains a record of processing activities detailing, according to their purpose, the processing operations carried out and all other circumstances required by current regulations.'}
              </p>
            </div>

            {/* Minors */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Datos personales de menores de edad' : 'Personal data of minors'}</h2>
              <p>
                {lang === 'es'
                  ? 'De conformidad con lo establecido en los artículos 8 del RGPD y 7 de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales, solo los mayores de 14 años podrán otorgar su consentimiento para el tratamiento de sus datos personales de forma lícita por Legal Human.'
                  : 'In accordance with Articles 8 of the GDPR and 7 of Organic Law 3/2018 of 5 December on the Protection of Personal Data and guarantee of digital rights, only individuals over the age of 14 may lawfully give their consent for the processing of their personal data.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Si se trata de un menor de 14 años, será necesario el consentimiento de los padres o tutores para el tratamiento, y este solo se considerará lícito en la medida en que los mismos lo hayan autorizado.'
                  : 'In the case of a minor under 14, the consent of the parents or legal guardians is required for the processing, and such processing will only be considered lawful to the extent that it has been authorized by them.'}
              </p>
            </div>

            {/* Retention */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Plazo de conservación de los datos personales' : 'Retention period of personal data'}</h2>
              <p>
                {lang === 'es'
                  ? 'Los datos personales serán conservados durante los plazos legalmente establecidos, siempre y cuando el interesado no solicite su supresión.'
                  : 'The data will be retained for the legally established periods, provided that the data subject does not request their deletion.'}
              </p>
            </div>

            {/* Legal basis */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Base legal para el tratamiento de los datos personales' : 'Legal basis for data processing'}</h2>
              <p>
                {lang === 'es'
                  ? 'La base legal para el tratamiento de los datos personales es el consentimiento explícito del interesado, otorgado mediante la aceptación de esta Política de Privacidad y la cumplimentación del formulario de contacto.'
                  : 'The legal basis for data processing is the explicit consent of the data subject, given by accepting this Privacy Policy and completing the contact form.'}
              </p>
            </div>

            {/* Recipients */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Destinatarios de los datos personales' : 'Recipients of personal data'}</h2>
              <p>{lang === 'es' ? 'Los datos serán compartidos con los siguientes destinatarios:' : 'The data will be shared with the following recipients:'}</p>
              <ul className="legal-list">
                <li>
                  {lang === 'es'
                    ? 'Agencia Tributaria, con la finalidad de cumplir con las obligaciones legales (requerimiento legal).'
                    : 'Tax Authorities, for the purpose of complying with legal obligations (legal requirement).'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Entidades financieras, con la finalidad de tramitar los cobros correspondientes (requisito contractual).'
                    : 'Financial institutions, for the purpose of processing the corresponding payments (contractual requirement).'}
                </li>
              </ul>
            </div>

            {/* Disclosure to third parties */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Cesión de datos a terceros' : 'Disclosure of data to third parties'}</h2>
              <p>
                {lang === 'es'
                  ? 'Los datos personales no serán cedidos a terceros, salvo que exista una obligación legal o el interesado haya dado su consentimiento explícito.'
                  : 'Personal data will not be disclosed to third parties, except where there is a legal obligation or the data subject has given explicit consent.'}
              </p>
            </div>

            {/* Transfers to third countries */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Transferencias de datos a terceros países' : 'Transfers of data to third countries'}</h2>
              <p>
                {lang === 'es'
                  ? 'No se prevén transferencias de datos a terceros países.'
                  : 'No transfers of data to third countries are planned.'}
              </p>
            </div>

            {/* Rights */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Derechos derivados del tratamiento de los datos personales' : 'Rights arising from the processing of personal data'}</h2>
              <p>
                {lang === 'es'
                  ? 'El Usuario tiene sobre Legal Human los derechos reconocidos en el Reglamento General de Protección de Datos (RGPD) y en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales. Estos derechos podrán ejercerse ante el Responsable del tratamiento e incluyen:'
                  : 'The User has, with respect to Legal Human, the rights recognized in the General Data Protection Regulation (GDPR) and in Organic Law 3/2018 of 5 December on the Protection of Personal Data and guarantee of digital rights. These rights can be exercised before the Data Controller and include:'}
              </p>
              <ul className="legal-list">
                <li>
                  <strong>{lang === 'es' ? 'Derecho de acceso: ' : 'Right of access: '}</strong>
                  {lang === 'es'
                    ? 'El derecho del Usuario a obtener confirmación de si Legal Human está tratando o no sus datos personales y, en caso afirmativo, obtener información sobre los datos concretos, así como el tratamiento que realiza o ha realizado, su origen y los destinatarios de las comunicaciones realizadas o previstas.'
                    : "The User's right to obtain confirmation of whether Legal Human is processing their personal data. If so, the User may access information about such data, the processing carried out, its origin, and the recipients of any communications made or planned."}
                </li>
                <li>
                  <strong>{lang === 'es' ? 'Derecho de rectificación: ' : 'Right to rectification: '}</strong>
                  {lang === 'es'
                    ? 'El derecho del Usuario a que se modifiquen sus datos personales que resulten ser inexactos o, teniendo en cuenta los fines del tratamiento, incompletos.'
                    : "The User's right to request the correction of personal data that is inaccurate or incomplete, considering the purposes of the processing."}
                </li>
                <li>
                  <strong>{lang === 'es' ? 'Derecho de supresión ("derecho al olvido"): ' : 'Right to erasure ("right to be forgotten"): '}</strong>
                  {lang === 'es'
                    ? 'El derecho del Usuario, siempre que la legislación vigente no establezca lo contrario, a obtener la supresión de sus datos personales cuando estos ya no sean necesarios para los fines para los cuales fueron recogidos, cuando el Usuario haya retirado su consentimiento y no exista otra base jurídica que legitime el tratamiento, cuando el Usuario se oponga y no existan motivos legítimos que prevalezcan, cuando los datos hayan sido tratados ilícitamente, cuando exista una obligación legal de suprimirlos, o cuando se hayan recogido en relación con la oferta de servicios de la sociedad de la información.'
                    : "The User's right to request the deletion of their personal data when it is no longer necessary for the purposes for which it was collected, when consent is withdrawn and there is no other legal basis for the processing, when the User objects to the processing and there are no legitimate grounds to continue it, when the data have been processed unlawfully, when deletion is required by law, or when data were collected in connection with the provision of information society services."}
                </li>
                <li>
                  <strong>{lang === 'es' ? 'Derecho a la limitación del tratamiento: ' : 'Right to restriction of processing: '}</strong>
                  {lang === 'es'
                    ? 'El derecho del Usuario a limitar el tratamiento de sus datos personales.'
                    : "The User's right to request a restriction on the processing of their personal data."}
                </li>
                <li>
                  <strong>{lang === 'es' ? 'Derecho a la portabilidad de los datos: ' : 'Right to data portability: '}</strong>
                  {lang === 'es'
                    ? 'El derecho del Usuario a recibir los datos personales que le incumban, que haya facilitado a Legal Human en un formato estructurado, de uso común y lectura mecánica, y a transmitirlos a otro responsable del tratamiento.'
                    : "The User's right to receive their personal data in a structured, commonly used, and machine-readable format, and to transmit them to another data controller."}
                </li>
                <li>
                  <strong>{lang === 'es' ? 'Derecho de oposición: ' : 'Right to object: '}</strong>
                  {lang === 'es'
                    ? 'El derecho del Usuario a oponerse al tratamiento de sus datos personales o a solicitar el cese del mismo por parte de Legal Human.'
                    : "The User's right to object to the processing of their personal data or to request that such processing be ceased by Legal Human."}
                </li>
                <li>
                  <strong>{lang === 'es' ? 'Derecho a no ser objeto de decisiones automatizadas, incluida la elaboración de perfiles: ' : 'Right not to be subject to automated decisions, including profiling: '}</strong>
                  {lang === 'es'
                    ? 'El derecho del Usuario a no ser objeto de una decisión basada únicamente en el tratamiento automatizado de sus datos personales, incluida la elaboración de perfiles, salvo en los supuestos previstos en la normativa aplicable.'
                    : "The User's right not to be subject to decisions based solely on automated processing of their personal data, including profiling, except in cases permitted by applicable law."}
                </li>
              </ul>
              <p>
                {lang === 'es'
                  ? 'Para el ejercicio de sus derechos, el Usuario debe enviar una comunicación escrita al Responsable del tratamiento haciendo referencia a:'
                  : 'To exercise these rights, the User must send a written communication to the Data Controller referencing:'}
              </p>
              <ul className="legal-list">
                <li>
                  {lang === 'es'
                    ? 'Nombre completo del Usuario y copia de su DNI. En los casos de representación, será necesaria además la identificación por el mismo medio de la persona que le representa, así como el documento acreditativo de la representación. La copia del DNI podrá ser sustituida, siempre que acredite identidad, por cualquier otro medio válido en derecho.'
                    : "Full name of the User and a copy of their ID. In the case of representation, the identification of the representative and the document proving such representation will also be required. The copy of the ID may be replaced by any legally valid means that allows verification of identity."}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Petición en que se concreta la solicitud o información a la que se quiere acceder.'
                    : 'Detailed request explaining the purpose of the application or the information required.'}
                </li>
                <li>{lang === 'es' ? 'Domicilio a efecto de notificaciones.' : 'Address for notification purposes.'}</li>
                <li>{lang === 'es' ? 'Fecha y firma del solicitante.' : 'Date and signature of the applicant.'}</li>
                <li>
                  {lang === 'es'
                    ? 'Todo documento que acredite la petición que formula.'
                    : 'Documentation supporting the request, if necessary.'}
                </li>
              </ul>
              <p>{lang === 'es' ? 'La solicitud y documentación adjunta podrán remitirse a:' : 'The request and any attached documentation may be sent to:'}</p>
              <p>
                <strong>{lang === 'es' ? 'Dirección postal: ' : 'Postal address: '}</strong>
                Calle Almacil, 5, Door 10, 5th Floor, 46920, Mislata (Valencia), Spain
              </p>
              <p>
                <strong>Email: </strong>
                <a href="mailto:asesorialegalhuman@gmail.com" className="legal-link">asesorialegalhuman@gmail.com</a>
              </p>
            </div>

            {/* Complaints */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Reclamaciones ante la autoridad de control' : 'Complaints to the supervisory authority'}</h2>
              <p>
                {lang === 'es'
                  ? 'En caso de que el Usuario considere que existe un problema o infracción de la normativa vigente en la forma en la que se están tratando sus datos personales, tendrá derecho a la tutela judicial efectiva y a presentar una reclamación ante una autoridad de control, en particular, en el Estado en que tenga su residencia habitual, lugar de trabajo o lugar de la supuesta infracción. En el caso de España, la autoridad de control es la Agencia Española de Protección de Datos ('
                  : 'If the User believes that there is a problem or a violation of current regulations regarding the processing of their personal data, they have the right to effective judicial protection and to lodge a complaint with a supervisory authority, in particular in the country where they have their habitual residence, place of work, or where the alleged infringement occurred. In Spain, the supervisory authority is the Spanish Data Protection Agency ('}
                <a href="http://www.agpd.es" target="_blank" rel="noopener noreferrer" className="legal-link">http://www.agpd.es</a>
                {lang === 'es' ? ').' : ').'}
              </p>
            </div>

            {/* Data security */}
            <div className="legal-block">
              <h2>{lang === 'es' ? 'Seguridad de los datos' : 'Data security'}</h2>
              <p>
                {lang === 'es'
                  ? 'Legal Human adopta las medidas técnicas y organizativas adecuadas para proteger los datos personales contra el acceso no autorizado, la divulgación, la alteración o la destrucción.'
                  : 'Legal Human implements appropriate technical and organizational measures to protect personal data against unauthorized access, disclosure, alteration, or destruction.'}
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
