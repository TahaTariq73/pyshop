from django.db import models

class Product(models.Model):
    product_id = models.AutoField(auto_created=True, primary_key=True)
    product_name = models.CharField(max_length=40, default="")
    product_desc = models.CharField(max_length=1000, default="")
    product_image = models.ImageField(upload_to="Images", default="")
    product_price = models.IntegerField(default=0)
    product_brand = models.CharField(max_length=40, default="")
    product_condition = models.CharField(max_length=4, default="")
    product_reviews = models.IntegerField(default=0)

    def __str__(self):
        return self.product_name

class Order(models.Model):
    order_id = models.AutoField(auto_created=True, primary_key=True)
    order_name = models.CharField(max_length=40, default="")
    order_email = models.CharField(max_length=40, default="")
    order_address = models.CharField(max_length=200, default="")
    order_country = models.CharField(max_length=12, default="")
    order_city = models.CharField(max_length=12, default="")
    order_zipcode = models.IntegerField(default=0)
    order_phone_number = models.IntegerField(default=0)
    order_json = models.CharField(max_length=3000, default="")

    def __str__(self):
        return f"Order from {self.order_name}"

class Contact(models.Model):
    message_id = models.AutoField(auto_created=True, primary_key=True)
    message_sender = models.CharField(max_length=20, default="")
    message_email = models.EmailField(max_length=30, default="")
    message_content = models.CharField(max_length=2000, default="")

    def __str__(self):
        return f"Message from {self.message_sender}"

class OrderUpdate(models.Model):
    update_id = models.AutoField(auto_created=True, primary_key=True)
    order_id = models.IntegerField(default="")
    update_desc = models.CharField(max_length=1000)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Update of {self.order_id}"