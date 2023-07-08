from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from django.utils.timezone import now
from ckeditor.fields import RichTextField
from django.utils.html import strip_tags
from django.core.validators import RegexValidator

# Create your models here.


class CompanyInformation(models.Model):
    logo = CloudinaryField()
    page_header_image = CloudinaryField(null=True, blank=True)
    company_name = models.CharField(max_length=100)
    company_address = models.CharField(max_length=255)
    telephone = models.CharField(max_length=50)
    telephone_2 = models.CharField(max_length=14, null=True, blank=True)
    email = models.EmailField()
    company_history = RichTextField(blank=True, null=True)
    history_image = CloudinaryField(null=True, blank=True)
    about_company = RichTextField(blank=True, null=True)
    term_and_conditions = RichTextField(blank=True, null=True)
    privacy_policy = RichTextField(blank=True, null=True)
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    whatsapp_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)

    def get_logo_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.logo}")

    def get_page_header_image(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.page_header_image}")

    def get_history_image(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.history_image}")

    def safe_about_body_html(self):
        return strip_tags(self.about_company)

    class Meta:
        verbose_name_plural = "Company Information"

    def __str__(self):
        return f"{self.company_name}-{self.telephone}"


class Testimonial(models.Model):
    photo = CloudinaryField('image')
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=15)
    testimony = RichTextField()

    def __str__(self):
        return f"{self.name}"

    @property
    def get_photo_url(self):
        if self.photo and hasattr(self.photo, 'url'):
            return self.photo.url
        else:
            return "https://cdn-icons-png.flaticon.com/512/147/147142.png"


class PhotoGallery(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    description = RichTextField(blank=True, null=True)
    photo = CloudinaryField('image')

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.photo}")

    class Meta:
        verbose_name_plural = "Photo Gallery"

    def __str__(self):
        return f"{self.photo}"


class ContactUs(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    location = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=11)
    message = RichTextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Contact Us"


class EmailSubscription(models.Model):
    email = models.EmailField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email}"


class BranchAddress(models.Model):
    branch_name = models.CharField(max_length=20)
    phone_number = models.CharField(null=True, blank=True, max_length=11, validators=[
                                    RegexValidator(r'^\d{11}$', 'Enter a valid phone number.')])
    branch_address = models.CharField(max_length=225, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Branch Addresses"

    def __str__(self):
        return f"{self.branch_name}"


class CoreValue(models.Model):
    pic = CloudinaryField('image')
    title = models.CharField(max_length=50)
    description = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.pic}")

    def __str__(self):
        return f"{self.title}"


class HeroMenu(models.Model):
    pic = CloudinaryField('image')
    title = models.CharField(max_length=50)
    snippet = models.CharField(max_length=100)

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.pic}")

    class Meta:
        verbose_name_plural = "Hero Menu"


class Service(models.Model):
    pic = CloudinaryField('image')
    slug = models.SlugField(max_length=250, blank=True, null=True)
    title = models.CharField(max_length=50)
    description = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.pic}")

    def safe_description_body_html(self):
        return strip_tags(self.description)

    def __str__(self):
        return f"{self.title}"


class NetworkMarketing(models.Model):
    pic = CloudinaryField('image')
    title = models.CharField(max_length=50)
    sub_title = models.CharField(max_length=50, blank=True, null=True)
    description = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.pic}")

    class Meta:
        verbose_name_plural = "Network Marketing"

    def __str__(self):
        return f"{self.title}"

    def safe_description_body_html(self):
        return strip_tags(self.description)


class WhyChooseUs(models.Model):
    pic = CloudinaryField('image')
    title = models.CharField(max_length=50)
    sub_title = models.CharField(max_length=50, blank=True, null=True)
    description = RichTextField()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.pic}")

    class Meta:
        verbose_name_plural = "Why Choose Us"

    def __str__(self):
        return f"{self.title}"


class Stat(models.Model):
    pic = CloudinaryField('image')
    stat_figure = models.IntegerField()
    stat_title = models.CharField(max_length=50)

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.pic}")

    def __str__(self):
        return f"{self.stat_title}-{self.stat_figure}"
