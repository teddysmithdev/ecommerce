from django.urls import path
from .views import ( 
    ItemListView, 
    ItemDetailView,
    CategoryListView,
    AddToCartView, 
    OrderDetailView, 
    PaymentView, 
    AddCouponView,
    AddressListView,
    AddressCreateView,
    CountryListView,
    UserIDView
)



urlpatterns = [
    path('user-id/', UserIDView.as_view(), name='user-id'),
    path('addresses/', AddressListView.as_view(), name='address-list'),
    path('countries/', CountryListView.as_view(), name='country-list'),
    path('addresses/create', AddressCreateView.as_view(), name='address-create'),
    path('products/', ItemListView.as_view(), name='product-list'),
    path('products/<pk>', ItemDetailView.as_view(), name='product-detail'),
    path('category/<category>', CategoryListView.as_view(), name='product-detail'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('checkout/', PaymentView.as_view(), name='checkout'),
    path('add-coupon/', AddCouponView.as_view(), name='coupon')
]