import React, { useState } from "react";
import DraggableDialog from "../dialog";
import { Stack, Typography } from "@mui/material";
import { SupportAgent } from "@mui/icons-material";
import { useSelector } from "react-redux";
import moment from "moment";

const ScriptWc = ({ data }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [open, setOpen] = useState(false);

  const content = (
    <Stack spacing={2} width={830} mt={1}>
      <Typography variant="subtitle1">
 Bonjour, c’est [XXX] de KOMPAR.
 Je vous appelle pour vous souhaiter la bienvenue et vous confirmer la validation de votre contrat OHM Énergie. 

Afin de valider votre contrat de fourniture d'énergie, je dois réaliser un résumé de ce que mon collègue vous a présenté. M'autorisez-vous, à des fins de conformité, d'enregistrer les minutes qui viennent ?

Pour avoir plus d'information sur la protection des données personnelles chez Ohm énergie vous pouvez consulter la politique de confidentialité sur notre site internet www.ohm-energie.com.

Pour rappel, mon collègue vous a  <strong>
  {`Contacté le ${moment(data.date_de_la_signature).format("DD/MM/YYYY")} à ${moment(data.date_de_la_signature).format("HH:mm")}`}
</strong> 
 pour vous proposer un contrat de fourniture [d'électricité / de gaz / d’électricité et de gaz].



Questions
<ol>
  <li>Pouvez-vous me confirmer les coordonnées communiquées préalablement :<strong> {data.Civility}, {data.Prénom} {data.Nom}, {data.Email}, {data.Adresse} {data.Code_postal} {data.Commune} [Relire les coordonnées client] ?
</strong> </li>
  <li>Vous me confirmez également avoir plus de 18 ans et moins de 75 ans, et que vous n’êtes ni sous tutelle, ni sous curatelle ? [OUI Client].</li>
  <li>Pouvez-vous confirmer que vous avez autorisé Ohm énergie à accéder à vos données de consommation annuelles [Si électricité] et à votre puissance souscrite et votre option tarifaire ? [OUI Client] ?</li>
  <li>L'offre que mon collègue vous a proposé est l'offre {data.Offre}. Vous trouverez toutes ses caractéristiques dans la grille tarifaire, présente de l’e-mail que vous allez recevoir à la suite de notre appel. [Si électricité] : Vous m'avez indiqué choisir l'option [Base ou HPHC] et vous me confirmez que la puissance souscrite choisie est de <strong>{data.Puissance} </strong> . C’est bien cela ? [OUI Client].</li>
  <li>Le contrat est conclu pour :
•[Si offre Giga/Ultra Eco] jusqu’au 31/12/2024. A l’issue de cette période, vous serez basculé sur une offre qui vous sera communiqué 30 jours avant son entrée en vigueur.
•[Si offre prix fixe] une durée déterminée de [nombre d’année] an(s).
•[Si offre classique] une durée indéterminée.
Votre contrat est sans engagement. Je vous rappelle que vous disposez d'un délai de rétractation de 14 jours. Est-ce clair ? [OUI client]</li>
     <li>[Tout offre SAUF offres prix fixe] Sachez que les prix proposés peuvent faire l'objet d'une évolution tarifaire. Toute évolution tarifaire vous serait communiquée par e-mail 30 jours avant son entrée en vigueur, avec la possibilité de résilier sans frais, conformément à l'article L224-10 du Code de Consommation. Est-ce clair ? [OUI client]</li>
  <li>Vous me confirmez avoir compris que vous changiez de fournisseur pour rejoindre Ohm énergie et que l'activation de votre contrat sera le   <strong>{moment(data.date_de_début).format("DD/MM/YYYY")}</strong> ?</li>
  <li>Vous me confirmez avoir compris qu’un 1er  prélèvement correspondant au prorata de votre 1ère mensualité  sera réalisé 14 jours avant l'activation de votre compteur ?</li>
  <li>Vous me confirmez avoir été informé de ne pas résilier votre contrat actuel par vos soins afin de ne pas risquer une interruption de service avant votre activation chez Ohm Energie ?</li>
  <li>Vous me confirmez avoir reçu un 1er e-mail de notre part dont l’objet est « Vos documents précontractuels » ? [OUI client]. Cet e-mail comprend nos conditions générales de ventes.
</li>
  <li>Pouvez-vous me confirmer :
•nous avoir fourni tous les éléments permettant d’établir au mieux votre budget annuel ? [OUI client]
•avoir été informé du montant de votre mensualité de <strong>{data.Mensualité} €</strong> ? [OUI client]
•reconnaitre que vous vous engagez à payer ce montant ? [OUI client]
</li>
  <li>Enfin Pouvez-vous me confirmez votre accord de souscription à ce contrat, dont la mensualité est de <strong>{data.Mensualité} €</strong> ?
</li>

</ol>

      </Typography>
    </Stack>
  );
  return (
    <>
      {user && (user.role === "admin" || user.role === "wc") ? (
        <DraggableDialog
          variant="contained"
          startIcon=""
          chipIcon={<SupportAgent />}
          buttonText="script wc"
          title="script wc"
          text={content}
          setOpen={setOpen}
          open={open}
        />
      ) : null}
    </>
  );
};

export default ScriptWc;
