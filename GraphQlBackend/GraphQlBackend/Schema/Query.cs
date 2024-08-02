using GraphQlBackend.Entities;
using GraphQlBackend.Services;

namespace GraphQlBackend.Schema
{
    public class Query
    {
        [UsePaging(DefaultPageSize = 10, IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Customer> GetCustomers([Service] ICustomerService customerService)
        {
            return customerService.GetCustomersAndOrders();
        }

        [UsePaging(DefaultPageSize = 10, IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Order> GetOrders([Service] IOrderService orderService)
        {
            return orderService.GetOrders();
        }

        [UseOffsetPaging(DefaultPageSize = 10, IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Order> GetOffsetOrders([Service] IOrderService orderService)
        {
            return orderService.GetOrders();
        }
    }
}
