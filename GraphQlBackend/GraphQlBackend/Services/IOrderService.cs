using GraphQlBackend.Entities;
using GraphQlBackend.Models;

namespace GraphQlBackend.Services
{
    public interface IOrderService
    {
        IQueryable<Order> GetOrders();
        Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel);

        Task<bool> DeleteOrderAsync(int orderId);
    }
}
