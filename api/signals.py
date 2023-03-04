from django.db.models.signals import pre_save, post_save
from .utils import unique_slug_generator
from .models import *


def slug_generator(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


pre_save.connect(slug_generator, sender=Service)
# pre_save.connect(slug_generator, sender=OurProject)
