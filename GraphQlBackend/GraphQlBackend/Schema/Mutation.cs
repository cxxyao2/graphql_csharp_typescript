using System.Security.Claims;
using FirebaseAdminAuthentication.DependencyInjection.Models;
using GraphQlBackend.Entities;
using GraphQlBackend.Models;
using GraphQlBackend.Services;
using HotChocolate.Authorization;

namespace GraphQlBackend.Schema
{
    public class Mutation
    {
        [Authorize]
        public async Task<Customer> AddOrUpdateCustomer([Service] ICustomerService customerService, CustomerModel customer,ClaimsPrincipal claimsPrincipal)
        {
            string userId = claimsPrincipal.FindFirstValue(FirebaseUserClaimType.ID);
            string email = claimsPrincipal.FindFirstValue(FirebaseUserClaimType.EMAIL);
            string userName = claimsPrincipal.FindFirstValue(FirebaseUserClaimType.USERNAME);
            string verified = claimsPrincipal.FindFirstValue(FirebaseUserClaimType.EMAIL_VERIFIED);

            return await customerService.AddOrUpdateCustomerAsync(customer);
        }
        [Authorize]
        public async Task<Order> AddOrUpdateOrder([Service] IOrderService orderService, OrderModel order)
        {
            return await orderService.AddOrUpdateOrderAsync(order);
        }
       
        public async Task<bool> DeleteCustomer([Service] ICustomerService customerService, int customerId)
        {
            return await customerService.DeleteCustomerAsync(customerId);
        }
        [Authorize(Policy ="IsAdmin")]
        public async Task<bool> DeleteOrder([Service] IOrderService orderService, int orderId)
        {
            return await orderService.DeleteOrderAsync(orderId);
        }
    }
}
