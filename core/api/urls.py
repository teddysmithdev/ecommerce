from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import ItemListView, AddToCartView, OrderDetailView, PaymentView, AddCouponView


urlpatterns = [
    path('products/', ItemListView.as_view(), name='product-list'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('checkout/', PaymentView.as_view(), name='checkout'),
    path('add-coupon/', AddCouponView.as_view(), name='coupon')
]