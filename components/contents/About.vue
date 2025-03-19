<template>
  <div class="flex flex-col gap-2 items-center">
    <div class="p-0 md:p-5 text-2xl text-center font-condensed [.theme-peak_&]:font-bold text-primary">
      PROJET RADIOPHONIQUE À LONGUE PORTÉE
    </div>
    <Card class="block-card">
      <blockquote class="px-0 text-center">
        <p class="font-cursive text-xl md:text-2xl leading-5 md:leading-7 text-card-foreground/80">
          Nina.fm c'est une webradio artisanale et associative.<br class="hidden xl:block" />
          C'est bientôt 10 ans de pépites musicales diffusées gratuitement, en continu et sans publicité.<br
            class="hidden xl:block"
          />
          Ce sont des DJs qui partagent leurs mixtapes.<br class="hidden xl:block" />
          Enfin Nina.fm c'est nous, une bande de passionnés, mais avant-tout c'est vous, car sans auditeurs, pas de
          radio !
        </p>
      </blockquote>
    </Card>
    <Card class="block-card text-center flex flex-col items-stretch md:items-center gap-4">
      <h2 class="text-2xl font-condensed [.theme-peak_&]:font-bold m-0 text-primary">Devenez DJ !</h2>
      <p class="[.theme-vinyl_&]:text-foreground/80">
        Vous avez une mixtape à partager ? N'hésitez pas à nous la transmettre, nous pouvons l'intègrer à la
        programmation ! Dès que votre mixtape sera diffusée, votre nom de DJ apparaitra !
      </p>
      <Button as-child class="rounded-full">
        <a
          href="mailto:infos@nina.fm?subject=Demande%20tuto%20mixtape&body=Dis%20Nina%2C%20comment%20on%20fait%20une%20mixtape%3F"
        >
          ON VOUS GUIDE
        </a>
      </Button>
    </Card>
    <div class="flex gap-2 mt-5">
      <Button as-child variant="outline" size="icon" class="social-button">
        <a href="https://www.facebook.com/nina.webradio/" target="_blank" rel="noopener noreferrer">
          <NinaIcon icon="facebook-f" />
        </a>
      </Button>
      <Button as-child variant="outline" size="icon" class="social-button">
        <a href="mailto:infos@nina.fm" target="_blank" rel="noopener noreferrer">
          <NinaIcon icon="mail_outline" />
        </a>
      </Button>
      <Button as-child variant="outline" size="icon" class="social-button">
        <a href="https://www.mixcloud.com/Nina_fm/" target="_blank" rel="noopener noreferrer">
          <NinaIcon icon="soundcloud" />
        </a>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.block-card {
  @apply w-full bg-transparent md:bg-background/90 rounded-md p-2 md:p-6 border-0 shadow-none;
}
.social-button {
  @apply size-12 text-xl rounded-full bg-transparent hover:bg-primary/10 border-accent-foreground text-accent-foreground;
}
</style>
