using System.Security.Claims;
using HotChocolate.Authorization;
using GraphQlBackend.Entities;
using GraphQlBackend.Models;
using GraphQlBackend.Services;

namespace GraphQlBackend.Schema
{
    public class Mutation
    {
        [Authorize]
        public async Task<Customer> AddOrUpdateCustomer([Service] ICustomerService customerService, CustomerModel customer,ClaimsPrincipal claimsPrincipal)
        {
            string userRole = claimsPrincipal.FindFirstValue(ClaimTypes.Role);

            return await customerService.AddOrUpdateCustomerAsync(customer);
        }
        [Authorize]
        public async Task<Order> AddOrUpdateOrder([Service] IOrderService orderService, OrderModel order)
        {
            return await orderService.AddOrUpdateOrderAsync(order);
        }
        [Authorize(Roles = ["Admin"])]
        public async Task<bool> DeleteCustomer([Service] ICustomerService customerService, int customerId)
        {
            return await customerService.DeleteCustomerAsync(customerId);
        }
        [Authorize]
        public async Task<bool> DeleteOrder([Service] IOrderService orderService, int orderId)
        {
            return await orderService.DeleteOrderAsync(orderId);
        }
    }
}
