<template>
  <div class="flex flex-col items-center gap-2">
    <div class="font-condensed p-0 text-center text-2xl text-primary md:p-5 [.theme-peak_&]:font-bold">
      PROJET RADIOPHONIQUE À LONGUE PORTÉE
    </div>
    <Card class="block-card">
      <blockquote class="px-0 text-center">
        <p class="font-cursive text-xl leading-5 text-card-foreground/80 md:text-2xl md:leading-7">
          Nina.fm c'est une webradio artisanale et associative.
          <br class="hidden xl:block" />
          C'est bientôt 10 ans de pépites musicales diffusées gratuitement, en continu et sans publicité.
          <br class="hidden xl:block" />
          Ce sont des DJs qui partagent leurs mixtapes.
          <br class="hidden xl:block" />
          Enfin Nina.fm c'est nous, une bande de passionnés, mais avant-tout c'est vous, car sans auditeurs, pas de
          radio&nbsp;!
        </p>
      </blockquote>
    </Card>
    <Card class="block-card flex flex-col items-stretch gap-4 text-center md:items-center">
      <h2 class="font-condensed m-0 text-2xl text-primary [.theme-peak_&]:font-bold">Devenez DJ !</h2>
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
    <div class="mt-5 flex gap-2">
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
    @apply w-full rounded-md border-0 bg-transparent p-2 shadow-none md:bg-background/90 md:p-6;
  }
  .social-button {
    @apply size-12 rounded-full border-accent-foreground bg-transparent text-xl text-accent-foreground hover:bg-primary/10;
  }
</style>
