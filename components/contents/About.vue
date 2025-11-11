<script setup lang="ts">
  import { MailIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="font-condensed p-0 text-center text-2xl text-primary md:p-5 [.theme-peak_&]:font-bold">
      PROJET RADIOPHONIQUE À LONGUE PORTÉE
    </div>
    <div class="mb-5 flex gap-2">
      <Button as-child variant="outline" size="icon" class="social-button">
        <a href="https://www.mixcloud.com/Nina_fm/" target="_blank" rel="noopener noreferrer">
          <MixcloudIcon />
        </a>
      </Button>
      <Button as-child variant="outline" size="icon" class="social-button">
        <a href="mailto:infos@nina.fm" target="_blank" rel="noopener noreferrer">
          <MailIcon class="size-5" />
        </a>
      </Button>
      <Button as-child variant="outline" size="icon" class="social-button">
        <a href="https://www.facebook.com/nina.webradio/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </a>
      </Button>
      <Button as-child variant="outline" size="lg" class="social-button-text">
        <a href="https://chat.whatsapp.com/EQSRbq6bdneCZSlED4kKZ0" target="_blank" rel="noopener noreferrer">
          <WhatsappIcon />
          Les étoiles de Nina
        </a>
      </Button>
    </div>
    <Card class="block-card">
      <blockquote class="px-0 text-center">
        <p class="">
          Nina.fm c'est une webradio artisanale et associative.
          <br class="hidden xl:block" />
          C'est bientôt 10 ans de pépites musicales diffusées gratuitement, en continu et sans publicité. Ce sont des
          DJs qui partagent leurs mixtapes.
          <br class="hidden xl:block" />
          Enfin Nina.fm c'est nous, une bande de passionnés, mais avant-tout c'est vous, car sans auditeurs, pas de
          radio&nbsp;!
        </p>
      </blockquote>
    </Card>
    <Card class="block-card flex flex-col items-stretch gap-2 text-center md:items-center">
      <h2 class="font-condensed m-0 text-2xl text-primary [.theme-peak_&]:font-bold">Ninaversaire !</h2>
      <p class="[.theme-vinyl_&]:text-foreground/80">
        Cett année, Nina.fm fête ses 10 ans ! Pour l'occasion, nous avons prévu plein de surprises ! Restez à l'écoute
        et faite briller votre étoile dans le ciel de Nina.fm ! Vous pouvez aussi rejoindre notre groupe WhatsApp
        "Les&nbsp;étoiles&nbsp;de&nbsp;Nina" pour tout savoir !
      </p>
    </Card>
    <Card class="block-card flex flex-col items-stretch gap-2 text-center md:items-center">
      <h2 class="font-condensed m-0 text-2xl text-primary [.theme-peak_&]:font-bold">Devenez DJ !</h2>
      <p class="[.theme-vinyl_&]:text-foreground/80">
        Vous avez une mixtape à partager ? N'hésitez pas à nous la transmettre, nous pouvons l'intègrer à la
        programmation ! Dès que votre mixtape sera diffusée, votre nom de DJ apparaitra !
      </p>
      <Button as-child class="mt-2 rounded-full">
        <a
          href="mailto:infos@nina.fm?subject=Demande%20tuto%20mixtape&body=Dis%20Nina%2C%20comment%20on%20fait%20une%20mixtape%3F"
        >
          ON VOUS GUIDE
        </a>
      </Button>
    </Card>
  </div>
</template>

<style scoped>
  .block-card {
    @apply w-full rounded-md border-0 bg-transparent p-2 shadow-none md:bg-background/90 md:p-6;
  }
  .social-button {
    @apply size-10 rounded-full border-accent-foreground bg-transparent text-xl text-accent-foreground hover:bg-primary/10 [&_svg.size-5]:size-5 [&_svg]:size-6;
  }
  .social-button-text {
    @apply h-10 rounded-full border-accent-foreground bg-transparent pl-3 pr-5 text-base text-accent-foreground hover:bg-primary/10 [&_svg.size-5]:size-5 [&_svg]:size-6;
  }
</style>
