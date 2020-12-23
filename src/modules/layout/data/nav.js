export default {
  items: [
    {
      name: 'Dashboard',
      url: '/',
      icon: 'fa fa-dashboard'
    },
    {
      name: 'Users',
      icon: 'fa fa-address-book',
      children: [
        {
          name: 'Artists',
          url: '/artists',
          icon: 'fa fa-address-card'
        },
        {
          name: 'Venues',
          url: '/venues',
          icon: 'fa fa-briefcase'
        },
        {
          name: 'Music Lovers',
          url: '/music-lovers',
          icon: 'fa fa-briefcase'
        },
      ]
    },
    {
      name: 'Gigs',
      url: '/gigs',
      icon: 'fa fa-microphone'
    },
    {
      name: 'Pages',
      icon: 'fa fa-address-card',
      children: [
        {
          name: 'About',
          url: '/about',
          icon: 'fa fa-align-left'
        },
        {
          name: 'Help',
          url: '/help',
          icon: 'fa fa-align-left'
        },
        {
          name: 'Preview',
          url: '/preview',
          icon: 'fa fa-align-left'
        },
        {
          name: 'Privacy-Policy',
          url: '/privacy-policy',
          icon: 'fa fa-align-left'
        },
      ]
    },
  ]
};
