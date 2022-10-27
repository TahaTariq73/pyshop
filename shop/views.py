from django.shortcuts import render
from django.http import HttpResponse
from .models import Contact, Product, Order, OrderUpdate
import json

def index(request):
    return render(request, "index.html")

def products(request):
    items = Product.objects.all()
    items_brand = list(map(lambda item: item.product_brand, items))
    items_brand = list(set(items_brand))

    products_list = {
        "products": items,
        "product_reviews_length": range(5),
        "search": None,
        "products_brand": items_brand
    }
    return render(request, "products.html", products_list)
    
def product(request, sno):
    searchProduct = Product.objects.filter(product_id=sno)
    params = {
        "product": searchProduct, 
        "product_reviews_fillstars": range(searchProduct[0].product_reviews),
        "product_reviews_emptystars": range(5 - searchProduct[0].product_reviews)
    }
    return render(request, "product.html", params)

def search(request, text):
    items = Product.objects.all()
    search_results = []
    search_brands  = []

    for i in items:
        if i.product_desc.lower().__contains__(text.lower()):
            search_results.append(i)
            search_brands.append(i.product_brand)
    products_list = {
        "products": search_results, 
        "search": text,
        "product_reviews_length": range(5), 
        "products_brand": list(set(search_brands))
    }
    return render(request, "products.html", products_list)

def tracker(request):
    if request.method == "POST":
        order_id = request.POST.get("order-id")
        email = request.POST.get("email")
        order = Order.objects.filter(order_id=order_id, order_email=email)
        
        try:
            if len(order) > 0:
                update = OrderUpdate.objects.filter(order_id=order_id)
                params = {"updates" : update}
                return render(request, "tracker.html", params)
        except Exception as err:
            pass

    params = {}
    return render(request, "tracker.html", params)

def about(request):
    return render(request, "about.html")

def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")
        contact = Contact(message_sender=name, message_email=email, message_content=message)
        contact.save()

        data = {"name": name, "email": email, "message": message}
        return HttpResponse(json.dumps(data, default=str))
    return render(request, "contact.html")

def checkout(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        address = request.POST.get("address")
        country = request.POST.get("country")
        city = request.POST.get("city")
        postal_code = request.POST.get("postal-code")
        phone_number = request.POST.get("number")
        items_json = request.POST.get("items-json")

        order = Order(order_name=name, order_email=email, order_address=address, order_json=items_json,
                order_country=country, order_city=city, order_zipcode=postal_code, order_phone_number=phone_number)
        order.save()

        params = {"order_id" : order.order_id}
        return render(request, "checkout.html", params)

    params = {"order_id" : None}
    return render(request, "checkout.html", params)