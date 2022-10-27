from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path("", views.index, name="Shop"),
    path("about/", views.about, name="About"),
    path("contact/", views.contact, name="Contact"),
    path("tracker/", views.tracker, name="Tracker"),
    path("checkout/", views.checkout, name="Checkout"),
    path("products/", views.products, name="Products"),
    path("products/search=<str:text>/", views.search, name="Search"),
    path("product/<int:sno>/", views.product, name="Product")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
